import {TestBed} from '@angular/core/testing';

import {HttpService} from './http.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';

describe('HttpService', () => {
    let service: HttpService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule
            ],
            providers: [
                HttpClient
            ]
        });
        service = TestBed.inject(HttpService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
