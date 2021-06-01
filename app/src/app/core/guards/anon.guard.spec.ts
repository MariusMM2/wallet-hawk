import {TestBed} from '@angular/core/testing';

import {AnonGuard} from './anon.guard';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {routes} from '../../app-routing.module';

describe('AnonGuard', () => {
    let guard: AnonGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                RouterModule.forRoot(routes)
            ]
        });
        guard = TestBed.inject(AnonGuard);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });
});
