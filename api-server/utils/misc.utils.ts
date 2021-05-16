/**
 * Executes a function that is prone to throwing errors until
 * the first successful execution.
 * @param {Function} errorProneFunc Function to execute
 * @param interval Interval between execution attempts
 * @param logging Whether to show status information in the console
 */
export async function tryUntilSuccessful(errorProneFunc: () => Promise<void>, interval: number = 5000, logging = false): Promise<void> {
    let tries = 0;

    while (true) {
        try {
            logging && console.log(`tryUntilSuccessful: Try #${++tries}`);
            await errorProneFunc();
            logging && console.log(`tryUntilSuccessful: Success`);
            return;
        } catch (e) {
            logging && console.log(`tryUntilSuccessful: Failed: ${e}`);
        }

        await sleep(interval);
    }
}

/**
 * Returns a Promise that resolves after the
 * provided time in milliseconds.
 * @param duration time in milliseconds to sleep
 */
export async function sleep(duration: number) {
    return new Promise((resolve => setTimeout(resolve, duration)));
}
