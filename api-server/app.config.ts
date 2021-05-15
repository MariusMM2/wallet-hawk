export const port = process.env.PORT || 3000;
export const locale = 'da-DK';
export const dateFormat = 'YYYY/MM/DD';

// create a file 'session.config.ts' that exports a 'secret' string
export {secret as sessionSecret} from './session.config';
export const sessionExpiryMillis = 7 * 24 * 60 * 60 * 1000;
