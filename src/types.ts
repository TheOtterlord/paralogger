export interface LoggerEvents {
  fatal: (msg: Message) => void
  error: (msg: Message) => void
  warn:  (msg: Message) => void
  info:  (msg: Message) => void
  debug: (msg: Message) => void
  trace: (msg: Message) => void
  log: (msg: Message) => void
  writeCache: (cache: Message[]) => void
}

export const logColors = {
  fatal: '\x1B[31m\x1B[1m',
  error: '\x1B[31m',
  warn:  '\x1b[33m',
  info:  '\x1b[32m',
  debug: '\x1b[36m',
  trace: '\x1b[90m',
  reset: '\x1b[0m'
};

/**
 * A log level to filter by.
 */
export type LogLevel = "info" | "debug" | "trace"

export interface Message {
  level: string
  message: string
}
