import { Component,  OnInit,  } from '@angular/core';

import { INglDatatableSort, INglDatatableRowClick } from 'ng-lightning/ng-lightning';
import { SpinnerComponent } from '../../../components'
import { PageClass } from '../../../class/page/page.class'


@Component({
	selector: 'time',
	templateUrl: "./time.template.html"
})
export class TimeComponent extends PageClass implements OnInit {
	constructor(
	) {
		super()
	}

	editModalOpen: boolean = false;

	ngOnInit() {
	}
	

}

