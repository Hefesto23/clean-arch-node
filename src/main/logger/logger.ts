import Logger from 'pino';

export const logger = new Logger({
  prettyPrint: { colorize: true },
});
