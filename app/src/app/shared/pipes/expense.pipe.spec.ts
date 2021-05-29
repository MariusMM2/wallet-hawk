import {ExpensePipe} from './expense.pipe';

describe('ExpensePipe', () => {
    it('create an instance', () => {
        const pipe = new ExpensePipe();
        expect(pipe).toBeTruthy();
    });
});
