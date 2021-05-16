import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonComponent} from './components/button/button.component';
import {FooterComponent} from './components/footer/footer.component';
import {HeaderComponent} from './components/header/header.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {MatModule} from './mat.module';
import {HamburgerMenuComponent} from './components/hamburger-menu/hamburger-menu.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
    declarations: [
        ButtonComponent,
        HeaderComponent,
        FooterComponent,
        HamburgerMenuComponent,
        NotFoundComponent
    ],
    imports: [
        CommonModule,
        MatModule,
        ReactiveFormsModule
    ],
    exports: [
        ButtonComponent,
        HeaderComponent,
        FooterComponent,
        NotFoundComponent,
        MatModule,
        ReactiveFormsModule
    ]
})
export class SharedModule {
}
