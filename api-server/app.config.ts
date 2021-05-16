export const port = process.env.PORT || 3001;
export const locale = 'da-DK';
export const dateFormat = 'YYYY/MM/DD';
export const passwordMinimumLength = 8;
export const passwordMaximumLength = 50;
export const emailMinimumLength = 1;
export const emailMaximumLength = 250;
export const passwordRegExp = /^(?=.{8,}$)(?=.*[\w])(?=.*[0-9])(?=.*[\W,_])(?!.*\s).*$/;

// create a file 'session.config.ts' that exports a 'secret' string
export {secret as sessionSecret} from './session.config';
export const sessionExpiryMillis = 7 * 24 * 60 * 60 * 1000;
