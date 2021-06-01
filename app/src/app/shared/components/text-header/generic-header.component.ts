import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-generic-header',
    templateUrl: './generic-header.component.html',
    styleUrls: ['./generic-header.component.scss']
})
export class GenericHeaderComponent {

    @Input() absolute = false;
}
