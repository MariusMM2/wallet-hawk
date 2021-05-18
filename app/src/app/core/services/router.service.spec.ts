import {TestBed} from '@angular/core/testing';

import {RouterService} from './router.service';
import {RouterModule} from '@angular/router';

describe('RouterService', () => {
    let service: RouterService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterModule.forRoot([])
            ]
        });
        service = TestBed.inject(RouterService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
