import { Eventra } from "@duxcore/eventra";
import { logColors, LoggerEvents, LogLevel, Message } from "./types";

export default class Logger extends Eventra<LoggerEvents> {
  cache: Message[] = []
  name: string
  cacheSize: number
  logLevel: string

  /**
   * @param name The name of the logger.
   * @param level The log level to use.
   * @param cacheSize The number of messages to cache before emptying and emitting writeCache.
   * @param consoleLog Whether to log to the console.
   */
  constructor(name: string, logLevel: LogLevel = 'info', cacheSize = 100, consoleLog = true) {
    super()
    this.name = name
    this.cacheSize = cacheSize
    this.logLevel = logLevel
    if (consoleLog) this.on('log', logToConsole(true))
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
  log(level: keyof LoggerEvents, message: string, forceWriteCache = false) {
    const log: Message = {
      level,
      message: `[${this.time()}] ${this.name}(${level}): ${message}`
    }
    this.cache.push(log)
    if (this.cache.length >= this.cacheSize || forceWriteCache) this.writeCache()
    this.emit('log', log)
    this.emit(level, log)
  }

  fatal(message: string) { this.log("fatal", message) }
  error(message: string) { this.log("error", message) }
  warn(message: string)  { this.log("warn",  message) }
  info(message: string)  { this.log("info",  message) }
  debug(message: string) { if (this.logLevel === 'debug' || this.logLevel === 'trace') this.log("debug", message) }
  trace(message: string) { if (this.logLevel === 'trace') this.log("trace", message) }

  /**
   * Returns a string with the current time in ISO format.
   */
  time() {
    return new Date().toISOString()
  }

  /**
   * Starts a timer and returns a function to stop the timer.
   * Calling the function to stop the timer will return the time elapsed since the timer was started.
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
 * Returns a function that logs messages to the console.
 * You can toggle colors with `useColors` (default: true).
 * 
 * Example:
 * ```ts
 * const logger = new Logger('my-logger')
 * // with colors
 * logger.on('log', logToConsole())
 * // without colors
 * logger.on('log', logToConsole(false))
 * ```
 */
export function logToConsole(useColors = true) {
  return (message: Message) => {
    let log: string
    if (useColors) log = `${logColors[message.level]}${message.message}${logColors['reset']}`
    else log = message.message
    console.log(log)
  }
}
