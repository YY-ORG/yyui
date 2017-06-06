import { Component,  OnInit, ViewEncapsulation  } from '@angular/core';

import { INglDatatableSort, INglDatatableRowClick } from 'ng-lightning/ng-lightning';
import { SpinnerComponent } from '../../../components'
import { PageClass } from '../../../class/page/page.class'


@Component({
	selector: 'source',
	styleUrls: ["./source.scss"],
	templateUrl: "./source.template.html",
	encapsulation: ViewEncapsulation.None
})
export class SourceComponent extends PageClass implements OnInit {
	constructor(
	) {
		super()
	}


	ngOnInit() {
	}
	

}

