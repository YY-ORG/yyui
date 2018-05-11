import { Component,  OnInit, ViewEncapsulation  } from '@angular/core';

import { INglDatatableSort, INglDatatableRowClick } from 'ng-lightning/ng-lightning';
import { SpinnerComponent } from '../../../components'
import { PageClass } from '../../../class/page/page.class'


@Component({
	selector: 'scores',
	styleUrls: ["./scores.scss"],
	templateUrl: "./scores.template.html",
	encapsulation: ViewEncapsulation.None
})
export class ScoresComponent extends PageClass implements OnInit {
	constructor(
	) {
		super()
	}

	ngOnInit() {
	}


	onConfirm() {
	}

}

