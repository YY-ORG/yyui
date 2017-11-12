import { Component,  OnInit, ViewEncapsulation, ViewChild  } from '@angular/core';

import { INglDatatableSort, INglDatatableRowClick } from 'ng-lightning/ng-lightning';
import { SpinnerComponent } from '../../../components'
import { PageClass } from '../../../class/page/page.class'
import { ExaminationAssesspaperService } from './examination-assesspaper.service'
import { AssesspaperComponent } from '../../components/assess-paper/assess-paper'

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

	@ViewChild('newAssessPaper') newAssessPaper: AssesspaperComponent;
	@ViewChild('editAssessPaper') editAssessPaper: AssesspaperComponent;

	willDeleteUser;
	editModalOpen: boolean = false;
	addModalOpen: boolean = false;
	assesspaperList: Assess.SimpleAssessPaperItem[] = []
  assessPaperProfileReq: Assess.AssessPaperProfileReq = new Assess.AssessPaperProfileReq;
	
	currentPage: number = 0
	maxPage: number = 1


	ngOnInit() {
		this.getPaperList()
	}

	getPaperList () {
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
		this.getPaperList()
	}
	
	newPaperOpen () {
		this.assessPaperProfileReq = new Assess.AssessPaperProfileReq
		this.newAssessPaper.refreshList()
		this.addModalOpen=true
	}
	creatNewPaper() {
		this.spinner.show()
		this.service.creatNewPaper(this.assessPaperProfileReq).then(res => {
			this.spinner.hide()
			this.addModalOpen = false
			this.getPaperList()
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

