import Logger, { logToConsole } from '../'

const logger = new Logger()

logger.on('log', logToConsole())

logger.info('Hello world!')
