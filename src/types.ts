export interface LogEvents {
  fatal: (log: Log) => void
  error: (log: Log) => void
  warn:  (log: Log) => void
  info:  (log: Log) => void
  debug: (log: Log) => void
  trace: (log: Log) => void
  log: (log: Log) => void
  writeCache: (cache: Log[]) => void
}

export type LogLevel = 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace'

export interface Log {
  scope: string
  level: LogLevel
  timestamp: Date
  message: string
}
