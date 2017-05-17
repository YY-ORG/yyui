import { Component, Input, Output, EventEmitter, OnChanges, SimpleChange, OnInit,  } from '@angular/core';

import { INglDatatableSort, INglDatatableRowClick } from 'ng-lightning/ng-lightning';
import { SpinnerComponent } from '../../../components'
import { PageClass } from '../../../class/page/page.class'

const DATA = [
	{ rank: 1, name: 'Kareem', surname: 'Abdul-Jabbar', points: 38387 },
	{ rank: 2, name: 'Karl', surname: 'Malone', points: 36928 },
	{ rank: 3, name: 'Kobe', surname: 'Bryant', points: 33643 },
	{ rank: 4, name: 'Michael', surname: 'Jordan', points: 32292 },
	{ rank: 5, name: 'Wilt', surname: 'Chamberlain', points: 31419 },
];

@Component({
	selector: 'index',
	templateUrl: "./index.template.html"
})
export class IndexComponent extends PageClass implements OnInit {
	constructor(
	) {
		super()
	}

	ngOnInit() {
		this.alert.open("真的假的")
	}
	
	pageChanged($event) {
		console.log($event)
	}
}

