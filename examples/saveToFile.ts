import fs from 'fs'
import Logger from '../'
import { Log } from '../lib/types'

const logger = new Logger()

/**
 * Save logs to a file (logs.txt)
 * Each log is on a new line
 */
function handler(logs: Log[]) {
  fs.appendFile('logs.txt', logs.map(log => `${log}\n`).join(), 'utf8', (err) => {
    if (err) console.log(err)
  })
}

logger.on('writeCache', handler)

// The second argument forces the cache to be broadcasted and cleared
logger.info('Hello world!', true)
