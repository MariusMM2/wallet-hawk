import {Component, Input} from '@angular/core';

/**
 * Angular Component that manages a single sidebar item.
 *
 * This component accepts two different slots for ng-content, the first slot
 * is for an <mat-icon> element, while the second slot is for the rest of the
 * ng-content.
 *
 * @input isActive Whether the item is currently the active route.
 */
@Component({
    selector: 'app-sidebar-item',
    templateUrl: './sidebar-item.component.html',
    styleUrls: ['./sidebar-item.component.scss']
})
export class SidebarItemComponent {
    @Input() isActive: boolean;
}
