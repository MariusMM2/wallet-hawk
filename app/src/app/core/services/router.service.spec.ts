import {TestBed} from '@angular/core/testing';

import {RouterService} from './router.service';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {routes} from '../../app-routing.module';

describe('RouterService', () => {
    let service: RouterService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                RouterModule.forRoot(routes)
            ]
        });
        service = TestBed.inject(RouterService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
