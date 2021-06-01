import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AuthenticateComponent} from './authenticate.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {routes} from '../app-routing.module';

describe('AuthenticateComponent', () => {
    let component: AuthenticateComponent;
    let fixture: ComponentFixture<AuthenticateComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                RouterModule.forRoot(routes)
            ],
            declarations: [
                AuthenticateComponent
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AuthenticateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
