import { Component,  OnInit, ViewEncapsulation  } from '@angular/core';

import { INglDatatableSort, INglDatatableRowClick } from 'ng-lightning/ng-lightning';
import { SpinnerComponent } from '../../../components'
import { PageClass } from '../../../class/page/page.class'


@Component({
	selector: 'table-structure',
	styleUrls: ["./table-structure.scss"],
	templateUrl: "./table-structure.template.html",
	encapsulation: ViewEncapsulation.None
})
export class TableStructureComponent extends PageClass implements OnInit {
	constructor(
	) {
		super()
	}

	willDeleteUser;
	editModalOpen: boolean = false;

	ngOnInit() {
	}
	
	deleteUser(d) {
		this.willDeleteUser = d;
		this.confirm.open("确定要删除此用户吗？")
	}

	editUser(d) {
		this.editModalOpen = true
	}

	onConfirm() {
		this.confirm.close()

		setTimeout(() => {
			this.alert.open("删除成功")
		}, 1000)
		console.log("23")
	}

}

