---
name: whatsapp-logger
description: "Log all incoming WhatsApp messages to a file"
metadata:
  {
    "openclaw":
      {
        "emoji": "💬",
        "events": ["message"],
        "install": [{ "id": "bundled", "kind": "bundled", "label": "Bundled with OpenClaw" }],
      },
  }
---

# WhatsApp Logger Hook

Logs all incoming WhatsApp messages to a log file for debugging and monitoring.

## Log File Location

`~/.openclaw/logs/whatsapp.log`

## Enabling

```bash
openclaw hooks enable whatsapp-logger
```

## Disabling

```bash
openclaw hooks disable whatsapp-logger
```
