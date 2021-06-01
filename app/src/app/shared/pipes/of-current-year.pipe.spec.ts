import {OfCurrentYearPipe} from './of-current-year.pipe';
import {TestBed} from '@angular/core/testing';
import {OfYearPipe} from './of-year.pipe';

describe('OfCurrentYearPipe', () => {
    let ofYear: OfYearPipe;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                OfYearPipe
            ]
        });
        ofYear = TestBed.inject(OfYearPipe);
    });

    it('create an instance', () => {
        const pipe = new OfCurrentYearPipe(ofYear);
        expect(pipe).toBeTruthy();
    });
});
