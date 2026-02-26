import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { resolveStateDir } from "../../../config/paths.js";
import { createSubsystemLogger } from "../../../logging/subsystem.js";
import type { HookHandler } from "../../hooks.js";

const log = createSubsystemLogger("whatsapp-logger");

const logWhatsApp: HookHandler = async (event) => {
  if (event.type !== "message") {
    return;
  }

  try {
    const stateDir = resolveStateDir(process.env, os.homedir);
    const logDir = path.join(stateDir, "logs");
    await fs.mkdir(logDir, { recursive: true });

    const logFile = path.join(logDir, "whatsapp.log");
    const logLine =
      JSON.stringify({
        timestamp: new Date().toISOString(),
        sender: event.context?.senderId ?? "unknown",
        channel: event.context?.channelId ?? "unknown",
      }) + "\n";

    await fs.appendFile(logFile, logLine, "utf-8");
    log.info("WhatsApp message logged");
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    log.error(`Failed to log message: ${message}`);
  }
};

export default logWhatsApp;
