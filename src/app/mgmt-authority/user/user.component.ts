import { Component, Input, Output, EventEmitter, OnChanges, SimpleChange, OnInit,  } from '@angular/core';

import { INglDatatableSort, INglDatatableRowClick } from 'ng-lightning/ng-lightning';
import { SpinnerComponent } from '../../../components'
import { PageClass } from '../../../class/page/page.class'


@Component({
	selector: 'user',
	templateUrl: "./user.template.html"
})
export class UserComponent extends PageClass implements OnInit {
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

