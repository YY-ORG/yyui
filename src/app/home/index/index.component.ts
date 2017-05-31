import { Component, Input, Output, EventEmitter, OnChanges, SimpleChange, OnInit,  } from '@angular/core';

import { INglDatatableSort, INglDatatableRowClick } from 'ng-lightning/ng-lightning';
import { SpinnerComponent } from '../../../components'
import { PageClass } from '../../../class/page/page.class'


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
	}
	
	pageChanged($event) {
		console.log($event)
	}
}

