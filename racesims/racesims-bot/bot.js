const { Client, GatewayIntentBits, Partials, EmbedBuilder, Events } = require('discord.js');

// ── CONFIG ──
const CONFIG = {
  token: process.env.DISCORD_TOKEN || '',  // Set DISCORD_TOKEN env var
  guildId: '1384357104210677821',
  channels: {
    introductions: '1486571794516152472',
    lounge: '1486571809183633552',
    modLog: '1459793832362381325',
  },
  autoRole: '1486571663322513428', // Racer
};

// ── CLIENT ──
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildModeration,
  ],
  partials: [Partials.Message],
});

// ── READY ──
client.once(Events.ClientReady, async () => {
  console.log(`[RaceSims Bot] Online as ${client.user.tag}`);
  console.log(`[RaceSims Bot] Serving guild: ${CONFIG.guildId}`);
  client.user.setActivity('racesims.in', { type: 3 });
});

// ── AUTO-ROLE + WELCOME DM ON JOIN ──
client.on(Events.GuildMemberAdd, async (member) => {
  if (member.guild.id !== CONFIG.guildId) return;

  // Auto-assign Racer role
  try {
    await member.roles.add(CONFIG.autoRole);
    console.log(`[Auto-Role] Assigned Racer to ${member.user.tag}`);
  } catch (e) {
    console.error(`[Auto-Role] Failed for ${member.user.tag}:`, e.message);
  }

  // Welcome DM
  try {
    const dm = new EmbedBuilder()
      .setTitle('Welcome to RaceSims India!')
      .setDescription(
        `Hey ${member.user.username}! Welcome aboard.\n\n` +
        `**Get started:**\n` +
        `1. Head to <#${CONFIG.channels.introductions}> and tell us about yourself\n` +
        `2. Jump into <#${CONFIG.channels.lounge}> and say hi\n\n` +
        `See you on track!`
      )
      .setColor(0xe84545)
      .setFooter({ text: 'RaceSims India • racesims.in' });
    await member.send({ embeds: [dm] });
    console.log(`[Welcome DM] Sent to ${member.user.tag}`);
  } catch (e) {
    console.log(`[Welcome DM] Could not DM ${member.user.tag} (DMs disabled)`);
  }

  // Log to mod channel
  try {
    const logChannel = await member.guild.channels.fetch(CONFIG.channels.modLog);
    await logChannel.send({
      embeds: [new EmbedBuilder()
        .setTitle('Member Joined')
        .setDescription(`**${member.user.tag}** joined the server\nAccount created: <t:${Math.floor(member.user.createdTimestamp / 1000)}:R>`)
        .setColor(0x34d399)
        .setTimestamp()
      ]
    });
  } catch (e) {}
});

// ── MEMBER LEAVE LOG ──
client.on(Events.GuildMemberRemove, async (member) => {
  if (member.guild.id !== CONFIG.guildId) return;
  try {
    const logChannel = await member.guild.channels.fetch(CONFIG.channels.modLog);
    const roles = member.roles.cache.filter(r => r.name !== '@everyone').map(r => r.name).join(', ') || 'None';
    await logChannel.send({
      embeds: [new EmbedBuilder()
        .setTitle('Member Left')
        .setDescription(`**${member.user.tag}** left the server\nRoles: ${roles}`)
        .setColor(0xe84545)
        .setTimestamp()
      ]
    });
  } catch (e) {}
});

// ── AUTO-MOD: Anti-spam, anti-invite ──
const spamMap = new Map();
client.on(Events.MessageCreate, async (msg) => {
  if (msg.author.bot || !msg.guild) return;
  if (msg.member?.permissions.has('Administrator')) return;

  // Block Discord invite links
  if (/discord\.(gg|com\/invite)\//i.test(msg.content)) {
    await msg.delete().catch(() => {});
    await msg.channel.send({ content: `${msg.author}, invite links are not allowed.` }).then(m => setTimeout(() => m.delete().catch(() => {}), 5000));
    return;
  }

  // Spam detection: 5 messages in 5 seconds = 1 min mute
  const key = msg.author.id;
  const now = Date.now();
  if (!spamMap.has(key)) spamMap.set(key, []);
  const timestamps = spamMap.get(key);
  timestamps.push(now);
  const recent = timestamps.filter(t => now - t < 5000);
  spamMap.set(key, recent);

  if (recent.length >= 5) {
    try {
      await msg.member.timeout(60000, 'Spam detection');
      await msg.channel.send({ content: `${msg.author} has been muted for 1 minute (spam).` }).then(m => setTimeout(() => m.delete().catch(() => {}), 10000));
      const logChannel = await msg.guild.channels.fetch(CONFIG.channels.modLog);
      await logChannel.send({
        embeds: [new EmbedBuilder()
          .setTitle('Auto-Mod: Spam Detected')
          .setDescription(`**${msg.author.tag}** was muted for 1 minute in <#${msg.channel.id}>`)
          .setColor(0xfbbf24)
          .setTimestamp()
        ]
      });
      spamMap.delete(key);
    } catch (e) {}
  }
});

// ── LOGIN ──
client.login(CONFIG.token);
