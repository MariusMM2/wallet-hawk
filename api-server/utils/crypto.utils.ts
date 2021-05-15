import bcrypt from 'bcrypt';

/**
 * Takes in a string and returns the bcrypt hash value of that string.
 * @param {string} string
 * @returns {string} hash value. of the string
 */
export function generateHash(string: string) {
    return bcrypt.hashSync(string, 10);
}

/**
 * Uses compareSync to test whether or not
 * the given string matches the given hash value.
 * @param {string} string
 * @param {string} hash
 * @returns {boolean} True if they match, false otherwise
 */
export function confirmHash(string: string, hash: string) {
    return bcrypt.compareSync(string, hash);
}
