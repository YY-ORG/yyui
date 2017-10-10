import { Component,  OnInit, ViewEncapsulation  } from '@angular/core';

import { INglDatatableSort, INglDatatableRowClick } from 'ng-lightning/ng-lightning';
import { SpinnerComponent } from '../../../components'
import { PageClass } from '../../../class/page/page.class'

import { ExaminationPaperService } from './examination-paper.service'


@Component({
	selector: 'examination-paper',
	styleUrls: ["./examination-paper.scss"],
	templateUrl: "./examination-paper.template.html",
	encapsulation: ViewEncapsulation.None
})
export class ExaminationPaperComponent extends PageClass implements OnInit {
	constructor(
		private service: ExaminationPaperService
	) {
		super()
	}

	willDeleteUser;
	editModalOpen: boolean = false;

	ngOnInit() {
		this.getItem()
	}

	getItem() {
		this.service.fetchExamination('9dc74b3e-a4f4-11e7-b65e-0cc47a669986').then(res => {
			console.log(res)
		})
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

