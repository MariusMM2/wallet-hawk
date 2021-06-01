import {DivideByMonthPipe} from './divide-by-month.pipe';
import {TestBed} from '@angular/core/testing';
import {OfMonthPipe} from './of-month.pipe';
import {OfCurrentMonthPipe} from './of-current-month.pipe';
import {DataPointsPipe} from './data-points.pipe';

describe('DivideByMonthPipe', () => {
    let ofMonth: OfMonthPipe;
    let ofCurrentMonth: OfCurrentMonthPipe;
    let dataPoints: DataPointsPipe;


    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                OfMonthPipe,
                OfCurrentMonthPipe,
                DataPointsPipe
            ]
        });
        ofMonth = TestBed.inject(OfMonthPipe);
        ofCurrentMonth = TestBed.inject(OfCurrentMonthPipe);
        dataPoints = TestBed.inject(DataPointsPipe);
    });

    it('create an instance', () => {
        const pipe = new DivideByMonthPipe(ofMonth, ofCurrentMonth, dataPoints);
        expect(pipe).toBeTruthy();
    });
});
