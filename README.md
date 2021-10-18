# Paralogger

![npm](https://img.shields.io/npm/v/paralogger)
![npm](https://img.shields.io/npm/dm/paralogger)

Paralogger is a completely customisable logger built upon it's own standard.
You seperate your logs into different scopes, filter through log levels, and ultimately decide how you display, store, or broadcast them.

## Installation

Install paralogger using your favourite package manager.

```bash
# npm
npm i paralogger

# yarn
yarn add paralogger
```

## Usage

Create a logger instance to begin working with paralogger, defining a scope or leaving it to the default (SYSTEM).

```ts
const logger = new Logger('CUSTOM')
```

## Standard

A log is made up of 4 properties.

- `scope` - The name of the logger instance
- `level` - The level of the log
- `timestamp` - The time the log was created
- `message` - The text contents of the log

You assign the scope when you create your logger instance.
You may have multiple logger instances, so this helps you keep track of a log's origins.

The level of a log details what the log is for.
The supported log levels are.

- `fatal` - Severe runtime errors that cause the application or subprocess to unexpectedly crash
- `error` - A non-fatal runtime error or other unusual conditional events
- `warn` - For use of deprecated items and important non-error events that should be looked at.
- `info` - Used for basic system events like started or stopped
- `debug` - Contains information useful for debugging issues with the application, such as internal state, etc.
- `trace` - The most detailed logs, useful for logging things like network traffic, login attemps, etc.

Timestamps should be presented in UTC or local time depending on the requirements of the project.
UTC is recommended where possible to avoid confusion for people in different zones to the deployment or for projects with deployments in multiple timezones.

Messages are a string, and should be single line when possible.
You may wish to apply your own standard for certain logs, like REST API logs, etc.

Logging to the console can be added using the following steps.

1. Import `logToConsole` from paralogger
2. Call `.on('log', logToConsole())` with your logger instance

This adds an event handler to log to the console.
You can remove the colors by passing the `colorful` argument as false.
This is the format that the `logToConsole()` handler uses.

```
YYYY-MM-DD HH:MM:SS {SCOPE} {LEVEL} {MESSAGE}
```

You can also create your own handlers and add them to any of the events.
A handler will be passed a `Log` object containing the 4 properties mentioned above.

## Contributing

Contributions are welcome.
If you wish to add something to paralogger, please make an issue to discuss it first :)

## License

Distributed under the [MIT](https://choosealicense.com/licenses/mit/) license.
