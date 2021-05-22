import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FooterComponent} from './components/footer/footer.component';
import {HeaderComponent} from './components/header/header.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {MatModule} from './mat.module';
import {HamburgerMenuComponent} from './components/hamburger-menu/hamburger-menu.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SubmitButtonComponent} from './components/submit-button/submit-button.component';
import {BudgetItemComponent} from './components/budget-item/budget-item.component';
import {AbsolutePipe} from './pipes/absolute.pipe';
import {LimitLabelsPipe} from './pipes/limit-labels.pipe';

/**
 * Angular module that contains miscellaneous or small, contained features used by other modules.
 */
@NgModule({
    declarations: [
        SubmitButtonComponent,
        HeaderComponent,
        FooterComponent,
        HamburgerMenuComponent,
        NotFoundComponent,
        BudgetItemComponent,
        AbsolutePipe,
        LimitLabelsPipe
    ],
    imports: [
        CommonModule,
        MatModule,
        ReactiveFormsModule
    ],
    exports: [
        SubmitButtonComponent,
        HeaderComponent,
        FooterComponent,
        NotFoundComponent,
        MatModule,
        ReactiveFormsModule,
        BudgetItemComponent,
        AbsolutePipe,
        LimitLabelsPipe
    ]
})
export class SharedModule {
}
