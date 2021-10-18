import { TypedEmitter } from 'tiny-typed-emitter'
import { LogEvents, LogLevel, Log } from "./types"

export default class Logger extends TypedEmitter<LogEvents> {
  cache: Log[] = []
  scope: string
  cacheSize: number

  /**
   * @param scope The name of the logger.
   * @param cacheSize The number of messages to cache before emptying and emitting writeCache.
   */
  constructor(scope='SYSTEM', cacheSize = 100) {
    super()
    this.scope = scope
    this.cacheSize = cacheSize
  }

  /**
   * Emits the writeCache event and clears the cache.
   */
  writeCache() {
    this.emit('writeCache', this.cache)
    this.cache = []
  }

  /**
   * Logs a message to the console.
   * @param level The log level.
   * @param message The message to log.
   * @param forceCWriteCache Whether to force the writeCache event.
   */
  log(level: LogLevel, message: string, forceWriteCache = false) {
    const log: Log = {
      level,
      message,
      scope: this.scope,
      timestamp: new Date()
    }
    this.cache.push(log)
    if (this.cache.length >= this.cacheSize || forceWriteCache) this.writeCache()
    this.emit('log', log)
    this.emit(level, log)
  }

  fatal(message: string, forceWriteCache=false) { this.log("fatal", message, forceWriteCache) }
  error(message: string, forceWriteCache=false) { this.log("error", message, forceWriteCache) }
  warn(message: string, forceWriteCache=false)  { this.log("warn",  message, forceWriteCache) }
  info(message: string, forceWriteCache=false)  { this.log("info",  message, forceWriteCache) }
  debug(message: string, forceWriteCache=false) { this.log("debug", message, forceWriteCache) }
  trace(message: string, forceWriteCache=false) { this.log("trace", message, forceWriteCache) }

  /**
   * Starts a timer and returns a function to stop the timer.
   * Calling the function to stop the timer will return the time elapsed since the timer was started (in milliseconds).
   */
  timer() {
    const t1 = performance.now()
    return () => performance.now() - t1
  }

  /**
   * Get a stack trace.
   */
  stack() {
    const stack = new Error().stack?.split('\n')
    stack?.splice(0, 2)
    return stack?.forEach(l => l.split('at ')[1])
  }
}

/**
 * Creates a handler to log to the console.
 * @param colorful Whether to use colors.
 */
export function logToConsole(colorful=true) {
  return (log: Log) => {
    console.log(
      colorful ? '\x1b[90m%s\x1b[0m %s \x1b[36m%s\x1b[0m %s' : '%s %s %s %s',
      log.timestamp.toISOString().split('.')[0].replace('T', ' '),
      log.scope,
      log.level,
      log.message
    )
  }
}
