import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RouterService} from '../../../core/services/router.service';

/**
 * Angular Component that handles displaying of a 404 status error
 * for unknown routes.
 */
@Component({
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

    unknownUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: RouterService) {
    }

    ngOnInit(): void {
        this.unknownUrl = this.route.snapshot.url.join('/');
    }

    async onClick() {
        await this.router.home();
    }
}
