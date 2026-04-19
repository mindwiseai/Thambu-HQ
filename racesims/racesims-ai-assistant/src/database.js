import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_PATH = join(__dirname, '..', 'data', 'racesims-ai.db');

let db;

export function getDB() {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    initTables();
  }
  return db;
}

function initTables() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      phone TEXT UNIQUE,
      name TEXT,
      channel TEXT DEFAULT 'whatsapp',
      instagram_id TEXT,
      lead_score INTEGER DEFAULT 0,
      budget_range TEXT,
      product_interest TEXT,
      space_available TEXT,
      experience_level TEXT,
      city TEXT,
      notes TEXT,
      status TEXT DEFAULT 'active',
      is_paused INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS conversations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      contact_id INTEGER,
      channel TEXT DEFAULT 'whatsapp',
      platform_message_id TEXT,
      role TEXT,
      content TEXT,
      metadata TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (contact_id) REFERENCES contacts(id)
    );

    CREATE TABLE IF NOT EXISTS escalations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      contact_id INTEGER,
      reason TEXT,
      trigger_message TEXT,
      status TEXT DEFAULT 'pending',
      notified_at DATETIME,
      resolved_at DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (contact_id) REFERENCES contacts(id)
    );

    CREATE TABLE IF NOT EXISTS lead_events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      contact_id INTEGER,
      event_type TEXT,
      score_delta INTEGER,
      details TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (contact_id) REFERENCES contacts(id)
    );

    CREATE INDEX IF NOT EXISTS idx_conversations_contact ON conversations(contact_id);
    CREATE INDEX IF NOT EXISTS idx_conversations_created ON conversations(created_at);
    CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
    CREATE INDEX IF NOT EXISTS idx_contacts_lead_score ON contacts(lead_score DESC);
    CREATE INDEX IF NOT EXISTS idx_escalations_status ON escalations(status);
  `);
}

// --- Contact operations ---

export function findOrCreateContact(phone, channel = 'whatsapp', instagramId = null) {
  const db = getDB();

  let contact;
  if (channel === 'instagram' && instagramId) {
    contact = db.prepare('SELECT * FROM contacts WHERE instagram_id = ?').get(instagramId);
  } else {
    contact = db.prepare('SELECT * FROM contacts WHERE phone = ?').get(phone);
  }

  if (!contact) {
    const stmt = db.prepare(`
      INSERT INTO contacts (phone, channel, instagram_id) VALUES (?, ?, ?)
    `);
    const result = stmt.run(phone || `ig_${instagramId}`, channel, instagramId);
    contact = db.prepare('SELECT * FROM contacts WHERE id = ?').get(result.lastInsertRowid);
  }

  return contact;
}

export function updateContact(id, fields) {
  const db = getDB();
  const allowed = ['name', 'lead_score', 'budget_range', 'product_interest', 'space_available',
                   'experience_level', 'city', 'notes', 'status', 'is_paused'];
  const updates = [];
  const values = [];

  for (const [key, value] of Object.entries(fields)) {
    if (allowed.includes(key)) {
      updates.push(`${key} = ?`);
      values.push(value);
    }
  }

  if (updates.length > 0) {
    updates.push('updated_at = CURRENT_TIMESTAMP');
    values.push(id);
    db.prepare(`UPDATE contacts SET ${updates.join(', ')} WHERE id = ?`).run(...values);
  }

  return db.prepare('SELECT * FROM contacts WHERE id = ?').get(id);
}

// --- Conversation operations ---

export function addMessage(contactId, role, content, channel = 'whatsapp', platformMsgId = null, metadata = null) {
  const db = getDB();
  return db.prepare(`
    INSERT INTO conversations (contact_id, channel, platform_message_id, role, content, metadata)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(contactId, channel, platformMsgId, role, content, metadata ? JSON.stringify(metadata) : null);
}

export function getConversationHistory(contactId, limit = 20) {
  const db = getDB();
  return db.prepare(`
    SELECT * FROM conversations WHERE contact_id = ? ORDER BY created_at DESC LIMIT ?
  `).all(contactId, limit).reverse();
}

// --- Escalation operations ---

export function createEscalation(contactId, reason, triggerMessage) {
  const db = getDB();
  return db.prepare(`
    INSERT INTO escalations (contact_id, reason, trigger_message) VALUES (?, ?, ?)
  `).run(contactId, reason, triggerMessage);
}

export function getPendingEscalations() {
  const db = getDB();
  return db.prepare(`
    SELECT e.*, c.phone, c.name, c.lead_score, c.product_interest, c.budget_range, c.channel
    FROM escalations e
    JOIN contacts c ON e.contact_id = c.id
    WHERE e.status = 'pending'
    ORDER BY e.created_at DESC
  `).all();
}

export function resolveEscalation(id) {
  const db = getDB();
  return db.prepare(`
    UPDATE escalations SET status = 'resolved', resolved_at = CURRENT_TIMESTAMP WHERE id = ?
  `).run(id);
}

// --- Lead scoring ---

export function addLeadEvent(contactId, eventType, scoreDelta, details = '') {
  const db = getDB();
  db.prepare(`
    INSERT INTO lead_events (contact_id, event_type, score_delta, details) VALUES (?, ?, ?, ?)
  `).run(contactId, eventType, scoreDelta, details);

  // Update total score
  const total = db.prepare(`
    SELECT COALESCE(SUM(score_delta), 0) as total FROM lead_events WHERE contact_id = ?
  `).get(contactId);

  db.prepare('UPDATE contacts SET lead_score = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
    .run(Math.min(Math.max(total.total, 0), 10), contactId);

  return total.total;
}

// --- Dashboard queries ---

export function getDashboardStats() {
  const db = getDB();

  const today = new Date().toISOString().split('T')[0];

  const totalContacts = db.prepare('SELECT COUNT(*) as count FROM contacts').get().count;
  const hotLeads = db.prepare('SELECT COUNT(*) as count FROM contacts WHERE lead_score >= 8').get().count;
  const warmLeads = db.prepare('SELECT COUNT(*) as count FROM contacts WHERE lead_score >= 5 AND lead_score < 8').get().count;
  const coldLeads = db.prepare('SELECT COUNT(*) as count FROM contacts WHERE lead_score > 0 AND lead_score < 5').get().count;
  const pendingEscalations = db.prepare('SELECT COUNT(*) as count FROM escalations WHERE status = \'pending\'').get().count;

  const todayConversations = db.prepare(`
    SELECT COUNT(DISTINCT contact_id) as count FROM conversations
    WHERE date(created_at) = date('now')
  `).get().count;

  const todayMessages = db.prepare(`
    SELECT COUNT(*) as count FROM conversations WHERE date(created_at) = date('now')
  `).get().count;

  const pausedBots = db.prepare('SELECT COUNT(*) as count FROM contacts WHERE is_paused = 1').get().count;

  return {
    totalContacts,
    hotLeads,
    warmLeads,
    coldLeads,
    pendingEscalations,
    todayConversations,
    todayMessages,
    pausedBots
  };
}

export function getActiveConversations(limit = 50) {
  const db = getDB();
  return db.prepare(`
    SELECT c.*,
      (SELECT content FROM conversations WHERE contact_id = c.id ORDER BY created_at DESC LIMIT 1) as last_message,
      (SELECT role FROM conversations WHERE contact_id = c.id ORDER BY created_at DESC LIMIT 1) as last_message_role,
      (SELECT created_at FROM conversations WHERE contact_id = c.id ORDER BY created_at DESC LIMIT 1) as last_message_at,
      (SELECT COUNT(*) FROM conversations WHERE contact_id = c.id) as message_count,
      (SELECT COUNT(*) FROM escalations WHERE contact_id = c.id AND status = 'pending') as pending_escalation
    FROM contacts c
    WHERE c.status = 'active'
    ORDER BY
      pending_escalation DESC,
      c.lead_score DESC,
      last_message_at DESC
    LIMIT ?
  `).all(limit);
}
