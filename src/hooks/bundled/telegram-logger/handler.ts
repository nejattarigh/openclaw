import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { resolveStateDir } from "../../../config/paths.js";
import { createSubsystemLogger } from "../../../logging/subsystem.js";
import type { HookHandler } from "../../hooks.js";

const log = createSubsystemLogger("telegram-logger");

const logTelegram: HookHandler = async (event) => {
  if (event.type !== "message") {
    return;
  }

  // Nur Telegram-Nachrichten loggen
  if (event.context?.channelId !== "telegram") {
    return;
  }

  try {
    const stateDir = resolveStateDir(process.env, os.homedir);
    const logDir = path.join(stateDir, "logs");
    await fs.mkdir(logDir, { recursive: true });

    const logFile = path.join(logDir, "telegram.log");
    const logLine =
      JSON.stringify({
        timestamp: new Date().toISOString(),
        sender: event.context?.senderId ?? "unknown",
        channel: event.context?.channelId ?? "unknown",
      }) + "\n";

    await fs.appendFile(logFile, logLine, "utf-8");
    log.info("Telegram message logged");
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    log.error(`Failed to log message: ${message}`);
  }
};

export default logTelegram;
