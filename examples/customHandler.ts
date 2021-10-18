import Logger from '../'
import { Log } from '../lib/types'

const logger = new Logger()

/**
 * This handler logs just the level and message of the log.
 * @param log The log.
 */
function handler(log: Log) {
  console.log(log.level, log.message)
}

logger.on('log', handler)

logger.info('Hello world!')
