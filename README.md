# Paralogger

![npm](https://img.shields.io/npm/v/paralogger)
![npm](https://img.shields.io/npm/dm/paralogger)

Paralogger is a customisable logger for node.js and the web.
It is built ontop of the [Eventra](https://github.com/duxcore/eventra) event emitter so you have full control over how logs are broadcast/stored.

## Installation

Install paralogger using your favourite package manager.

```bash
# npm
npm i paralogger

# yarn
yarn add paralogger
```

## Usage

Create a logger instance to begin working with paralogger.

```ts
const logger = new Logger('my-logger')
```

Optionally, use log levels to filter what logs are allowed. `info`, `warn`, `error` and `fatal` are always allowed.

Enable `debug` with the `debug` level.
Or enable `debug` and `trace` with the `trace` level.

```ts
const logger = new Logger('my-logger', 'trace')
```

The full list of parameters are below.

- `name: string` - name of the logger
- `level: 'info' | 'debug' | 'trace'` (default: 'info') - level of logging allowed
- `cacheSize: number` (default: 100) - max size of the cache before writing
- `consoleLog: boolean` (default: true) - whether to enable builtin console logging

### Outputting logs

By default, the only builtin output is the console, and even that is optional.
This allows paralogger to work anywhere, even on the web.
Instead, you can create output vectors for your logs, depending on what you need.

For example, here is a listener that will write logs to a file when the cache is cleared:

```ts
const logger = new Logger('my-logger')

logger.on('writeCache', (cache) => {
  fs.appendFile('my_logger.txt', cache.map(m => m.message).join('\n')+'\n', 'utf8', (err) => {
    if (err) logger.error('Failed to write cache to file')
  })
})

logger.info('Write me to file')
logger.writeCache()
```

This could even be used to send a direct message to a discord bot developer if their bot dies!

```ts
logger.on('fatal' async (log) => {
  const dev = await bot.users.fetch(DEVELOPER_ID)
  const dm = dev.createDM()
  dm.send(`Fatal Error!\n${log.message}`)
})
```

But the gist of it is that no matter what your requirements, just add a listener, and reroute the logs to wherever you wish.

## Contributing

Contributions are welcome.
If you wish to add something to paralogger, please make an issue to discuss it first :)

## License

Distributed under an MIT license.
