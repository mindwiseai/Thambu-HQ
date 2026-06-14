#!/usr/bin/env python3
"""
IERL Kiosk — driver sign-in for a shared Assetto Corsa rig.

Greets the customer, takes their name + phone, builds a unique leaderboard
handle, writes that handle into the AC driver-name fields, logs the entry,
and launches Content Manager straight into the chosen class server.

Zero dependencies — Python 3 standard library only. Runs on the rig's
Windows PC: `python kiosk.py`, then open the printed URL in a browser in
fullscreen/kiosk mode.

See README.md for the one on-rig verification step (confirm the name
actually reaches the server — Content Manager can override race.ini from
its own settings; if so, switch NAME write targets in config).
"""

import json
import os
import re
import sys
import csv
import datetime
import webbrowser
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

HERE = os.path.dirname(os.path.abspath(__file__))
PLACEHOLDER = "— SET NAME —"          # what we reset to after each session
PORT = int(os.environ.get("IERL_KIOSK_PORT", "8900"))


# ─────────────────────────────────────────────────────────────────────────
# Config
# ─────────────────────────────────────────────────────────────────────────
def load_config():
    for name in ("config.json", "config.example.json"):
        path = os.path.join(HERE, name)
        if os.path.exists(path):
            with open(path, encoding="utf-8") as f:
                cfg = json.load(f)
            cfg["_source"] = name
            return cfg
    raise SystemExit("No config.json or config.example.json found next to kiosk.py")


CFG = load_config()
SIMULATE = bool(CFG.get("simulate", True))


def log_path():
    month = datetime.date.today().strftime("%Y-%m")
    return os.path.join(HERE, f"entries-{month}.csv")


# ─────────────────────────────────────────────────────────────────────────
# Handle building + uniqueness
# ─────────────────────────────────────────────────────────────────────────
def clean_name(raw):
    """First word, A-Z/0-9 only, uppercased, max 12 chars."""
    token = (raw or "").strip().split()[0] if (raw or "").strip() else ""
    token = re.sub(r"[^A-Za-z0-9]", "", token).upper()
    return token[:12]


def last4(phone):
    digits = re.sub(r"\D", "", phone or "")
    return digits[-4:] if len(digits) >= 4 else digits


def read_entries():
    path = log_path()
    if not os.path.exists(path):
        return []
    with open(path, newline="", encoding="utf-8") as f:
        return list(csv.DictReader(f))


def build_handle(name, phone):
    """
    Handle = NAME-#### (last 4 of phone). Guarantees a unique, payout-linked
    leaderboard identity. If the same handle already exists this month for a
    *different* phone, a numeric suffix is added so two people never merge.
    """
    base = clean_name(name) or "DRIVER"
    tail = last4(phone)
    handle = f"{base}-{tail}" if tail else base

    rows = read_entries()
    same_handle = [r for r in rows if r.get("handle") == handle]
    if same_handle:
        # same person returning (same phone) → reuse the handle
        if any(r.get("phone") == (phone or "") for r in same_handle):
            return handle
        # collision with a different person → suffix until unique
        existing = {r.get("handle") for r in rows}
        n = 2
        while f"{handle}-{n}" in existing:
            n += 1
        handle = f"{handle}-{n}"
    return handle


def append_entry(handle, name, phone, klass):
    path = log_path()
    new = not os.path.exists(path)
    with open(path, "a", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        if new:
            w.writerow(["timestamp", "handle", "name", "phone", "class", "rig", "centre"])
        w.writerow([
            datetime.datetime.now().isoformat(timespec="seconds"),
            handle, (name or "").strip(), (phone or "").strip(), klass,
            CFG.get("rig_name", ""), CFG.get("centre", ""),
        ])


# ─────────────────────────────────────────────────────────────────────────
# Write the driver name into Assetto Corsa, then launch Content Manager
# ─────────────────────────────────────────────────────────────────────────
def set_ini_values(path, values):
    """Set (section, key, value) tuples in an AC ini, preserving the rest."""
    lines = []
    if os.path.exists(path):
        with open(path, encoding="utf-8", errors="replace") as f:
            lines = f.read().splitlines()

    def section_bounds(name):
        start = None
        for i, ln in enumerate(lines):
            if ln.strip().lower() == f"[{name}]".lower():
                start = i
                break
        if start is None:
            return None, None
        end = len(lines)
        for j in range(start + 1, len(lines)):
            if lines[j].strip().startswith("["):
                end = j
                break
        return start, end

    for section, key, value in values:
        s, e = section_bounds(section)
        if s is None:
            if lines and lines[-1].strip() != "":
                lines.append("")
            lines.append(f"[{section}]")
            lines.append(f"{key}={value}")
        else:
            replaced = False
            for k in range(s + 1, e):
                stripped = lines[k].strip()
                if stripped and not stripped.startswith(";") and "=" in stripped:
                    if stripped.split("=", 1)[0].strip().lower() == key.lower():
                        lines[k] = f"{key}={value}"
                        replaced = True
                        break
            if not replaced:
                lines.insert(e, f"{key}={value}")

    with open(path, "w", encoding="utf-8") as f:
        f.write("\n".join(lines) + "\n")


def apply_driver_name(display_name):
    """
    Write the driver name to AC's config. Default targets cover both the
    online name and the in-car name. If Content Manager overrides these
    from its own settings on launch, set "name_targets" in config.json to
    point at the CM settings file instead (see README).
    """
    cfg_dir = CFG.get("ac_cfg_dir", "")
    targets = CFG.get("name_targets", [
        {"file": "race.ini", "section": "REMOTE", "key": "NAME"},
        {"file": "race.ini", "section": "CAR_0", "key": "DRIVER_NAME"},
    ])
    if SIMULATE:
        print(f"  [simulate] would set driver name -> {display_name!r} in {cfg_dir}")
        return
    by_file = {}
    for t in targets:
        by_file.setdefault(t["file"], []).append((t["section"], t["key"], display_name))
    for fname, values in by_file.items():
        set_ini_values(os.path.join(cfg_dir, fname), values)


def launch_class(klass):
    deeplink = CFG["classes"][klass]["deeplink"]
    if SIMULATE:
        print(f"  [simulate] would launch -> {deeplink}")
        return
    if sys.platform.startswith("win"):
        os.startfile(deeplink)  # noqa: P204 — opens the acmanager:// protocol via CM
    else:
        webbrowser.open(deeplink)


# ─────────────────────────────────────────────────────────────────────────
# HTTP server
# ─────────────────────────────────────────────────────────────────────────
class Handler(BaseHTTPRequestHandler):
    def _send(self, code, body, ctype="application/json"):
        data = body if isinstance(body, bytes) else body.encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", ctype)
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def log_message(self, *_):
        pass  # quiet

    def do_GET(self):
        if self.path in ("/", "/index.html"):
            with open(os.path.join(HERE, "index.html"), "rb") as f:
                return self._send(200, f.read(), "text/html; charset=utf-8")
        if self.path == "/api/config":
            return self._send(200, json.dumps({
                "rig_name": CFG.get("rig_name", "RIG"),
                "centre": CFG.get("centre", ""),
                "leaderboard_url": CFG.get("leaderboard_url", ""),
                "return_seconds": CFG.get("session_return_seconds", 12),
                "simulate": SIMULATE,
                "classes": {k: v.get("label", k) for k, v in CFG["classes"].items()},
            }))
        if self.path == "/healthz":
            return self._send(200, json.dumps({"ok": True}))
        return self._send(404, json.dumps({"error": "not found"}))

    def do_POST(self):
        length = int(self.headers.get("Content-Length", "0"))
        try:
            payload = json.loads(self.rfile.read(length) or b"{}")
        except json.JSONDecodeError:
            return self._send(400, json.dumps({"error": "bad json"}))

        if self.path == "/api/start":
            name = (payload.get("name") or "").strip()
            phone = (payload.get("phone") or "").strip()
            klass = payload.get("class")
            if not name:
                return self._send(400, json.dumps({"error": "Name is required."}))
            if klass not in CFG["classes"]:
                return self._send(400, json.dumps({"error": "Pick a class."}))
            handle = build_handle(name, phone)
            try:
                apply_driver_name(handle)
                append_entry(handle, name, phone, klass)
                launch_class(klass)
            except Exception as exc:  # surface to the screen, don't crash the kiosk
                return self._send(500, json.dumps({"error": f"Could not start: {exc}"}))
            return self._send(200, json.dumps({
                "ok": True, "handle": handle,
                "class_label": CFG["classes"][klass].get("label", klass),
            }))

        if self.path == "/api/reset":
            try:
                apply_driver_name(PLACEHOLDER)
            except Exception as exc:
                return self._send(500, json.dumps({"error": str(exc)}))
            return self._send(200, json.dumps({"ok": True}))

        return self._send(404, json.dumps({"error": "not found"}))


def main():
    print(f"IERL Kiosk  ·  config: {CFG['_source']}  ·  simulate={SIMULATE}")
    print(f"  rig: {CFG.get('rig_name')}  centre: {CFG.get('centre')}")
    url = f"http://localhost:{PORT}/"
    print(f"  serving {url}  (open in a browser, fullscreen for kiosk mode)")
    if SIMULATE:
        print("  SIMULATE mode: no files written, Content Manager not launched.")
    ThreadingHTTPServer(("0.0.0.0", PORT), Handler).serve_forever()


if __name__ == "__main__":
    main()
