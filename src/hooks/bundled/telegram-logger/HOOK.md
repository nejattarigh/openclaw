---
name: telegram-logger
description: "Log all incoming Telegram messages to a file"
metadata:
  {
    "openclaw":
      {
        "emoji": "📨",
        "events": ["message"],
        "install": [{ "id": "bundled", "kind": "bundled", "label": "Bundled with OpenClaw" }],
      },
  }
---

# Telegram Logger Hook

Logs all incoming Telegram messages to a log file for debugging and monitoring.

## Log File Location

`~/.openclaw/logs/telegram.log`

## Enabling

```bash
openclaw hooks enable telegram-logger
```

## Disabling

```bash
openclaw hooks disable telegram-logger
```
