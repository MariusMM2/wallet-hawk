export const port = process.env.PORT || 3001;
export const appPort = process.env.APP_PORT || 4200;
export const databasePort = process.env.DB_PORT || 3306;
export const corsWhitelist = [`http://localhost:${appPort}`, `http://localhost`];

export const locale = 'da-DK';
export const dateFormat = 'YYYY/MM/DD';
export const passwordMinimumLength = 8;
export const passwordMaximumLength = 50;
export const passwordRegExp = /^(?=.{8,}$)(?=.*[\w])(?=.*[\W,_])(?!.*\s).*$/;
export const emailMinimumLength = 1;
export const emailMaximumLength = 250;
export const emailRegExp = /^(?=.{8,}$)(?=.*[\w])(?=.*[\W,_])(?!.*\s).*$/;
export const nameMaximumLength = 250;

// create a file 'session.config.ts' that exports a 'secret' string
export {secret as sessionSecret} from './session.config';
export const sessionExpiryMillis = 7 * 24 * 60 * 60 * 1000;
