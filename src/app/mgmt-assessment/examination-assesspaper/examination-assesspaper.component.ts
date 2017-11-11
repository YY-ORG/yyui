import { Component,  OnInit, ViewEncapsulation  } from '@angular/core';

import { INglDatatableSort, INglDatatableRowClick } from 'ng-lightning/ng-lightning';
import { SpinnerComponent } from '../../../components'
import { PageClass } from '../../../class/page/page.class'
import { ExaminationAssesspaperService } from './examination-assesspaper.service'

import { Adminui, Assess, Common } from '../../../core';


@Component({
	selector: 'examination-assesspaper',
	styleUrls: ["./examination-assesspaper.scss"],
	templateUrl: "./examination-assesspaper.template.html"
})
export class ExaminationAssesspaperComponent extends PageClass implements OnInit {
	constructor(
    private service: ExaminationAssesspaperService
	) {
		super()
	}

	willDeleteUser;
	editModalOpen: boolean = false;
	assesspaperList: Assess.SimpleAssessPaperItem[] = []

	currentPage: number = 0
	maxPage: number = 1


	ngOnInit() {
		this.getTemplateList()
	}

	getTemplateList () {
		this.spinner.show()
		this.service.fetAssesspaperlist(this.currentPage, 10).then((res) => {
			this.spinner.hide()
			let [pageList, assesspaperList] = res
			this.currentPage = pageList.currentPage
			this.maxPage = pageList.totalPage
			this.assesspaperList = assesspaperList
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

