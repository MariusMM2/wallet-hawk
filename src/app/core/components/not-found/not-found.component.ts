import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

    unknownUrl: string;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.unknownUrl = this.route.snapshot.url.join('/');
    }

}
