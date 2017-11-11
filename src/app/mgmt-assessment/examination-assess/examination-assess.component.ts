import { Component,  OnInit, ViewEncapsulation  } from '@angular/core';

import { INglDatatableSort, INglDatatableRowClick } from 'ng-lightning/ng-lightning';
import { SpinnerComponent } from '../../../components'
import { PageClass } from '../../../class/page/page.class'
import { ExaminationAssessService } from './examination-assess.service'

import { Adminui, Assess, Common } from '../../../core';


@Component({
	selector: 'examination-assess',
	styleUrls: ["./examination-assess.scss"],
	templateUrl: "./examination-assess.template.html"
})
export class ExaminationAssessComponent extends PageClass implements OnInit {
	constructor(
    private service: ExaminationAssessService
	) {
		super()
	}

	willDeleteUser;
	editModalOpen: boolean = false;
	assessList: Assess.SimpleAssessItem[] = []

	currentPage: number = 0
	maxPage: number = 1


	ngOnInit() {
		this.getTemplateList()
	}

	getTemplateList () {
		this.spinner.show()
		this.service.fetAssesslist(0, 10).then((res) => {
			this.spinner.hide()
			let [pageList, assessList] = res
			this.currentPage = pageList.currentPage
			this.maxPage = pageList.totalPage
			console.log(assessList)
			this.assessList = assessList
		}).catch(res => this.spinner.hide())
	}

	pageChanged (pageEvent: any) {
		this.currentPage = pageEvent.currentpage
		this.getTemplateList()
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

