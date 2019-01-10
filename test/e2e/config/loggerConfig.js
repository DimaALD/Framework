const winston = require(`winston`);
const { createLogger, format, transports } = winston;
const fsExtra = require('fs-extra')
const path = require('path')

fsExtra.emptyDirSync(path.resolve('./logs/'));
fsExtra.emptyDirSync(path.resolve('./reports/'));

let logger = createLogger({
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple()
      )
    }),
    new transports.File({
      filename: `./logs/error.log`,
      level: `error`,
      format: format.combine(
        format.timestamp({ format: `YYYY-MM-DD HH:mm:ss` }),
        format.simple()
      )
    }),
    new transports.File({
      filename: `./logs/debug.log`,
      level: `debug`,
      format: format.combine(
        format.timestamp({ format: `YYYY-MM-DD HH:mm:ss` }),
        format.simple()
      )
    })
  ]
});

module.exports = {
  logger
};
