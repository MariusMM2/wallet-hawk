import {OfCurrentMonthPipe} from './of-current-month.pipe';
import {TestBed} from '@angular/core/testing';
import {OfMonthPipe} from './of-month.pipe';

describe('OfCurrentMonthPipe', () => {
    let ofMonth: OfMonthPipe;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                OfMonthPipe
            ]
        });
        ofMonth = TestBed.inject(OfMonthPipe);
    });

    it('create an instance', () => {
        const pipe = new OfCurrentMonthPipe(ofMonth);
        expect(pipe).toBeTruthy();
    });
});
