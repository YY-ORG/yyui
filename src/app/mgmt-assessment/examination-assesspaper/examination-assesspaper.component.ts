
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
	currentAssesspaperList: Assess.SimpleAssessPaperItem = new Assess.SimpleAssessPaperItem
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

	
	newPaperOpen () {
		this.assessPaperProfileReq = new Assess.AssessPaperProfileReq
		this.newAssessPaper.refreshList()
		this.addModalOpen=true
	}
	creatNewPaper() {
		let errorMessage = this.newAssessPaper.checkValue()
		if (errorMessage) {
			return this.alert.open(errorMessage)
		}

		this.spinner.show()
		this.service.creatNewPaper(this.assessPaperProfileReq).then(res => {
			this.spinner.hide()
			this.addModalOpen = false
			this.getPaperList()
		}).catch(e => this.spinner.hide())
	}

	pageChanged (pageEvent: any) {
		this.currentPage = pageEvent.currentpage
		this.getPaperList()
	}

	submiteEditPaper() {
		let errorMessage = this.editAssessPaper.checkValue()
		if (errorMessage) {
			return this.alert.open(errorMessage)
		}
		
		this.spinner.show()		
		this.service.updateNewPaper({
			id: this.currentAssesspaperList.id,
			...this.assessPaperProfileReq
		}).then(res => {
			this.spinner.hide()		
			this.editModalOpen = false
			this.getPaperList()
		}).catch(e => this.spinner.hide())
	}
		
	deletePaper(paper: Assess.SimpleAssessPaperItem) {
		this.confirm.open("确定要删除此考卷吗？")
		this.onConfirm = () => {
			this.confirm.close()
			this.spinner.show()
			this.service.deletePaper(paper.id).then(res => {
				this.spinner.hide()
				this.alert.open('删除成功')
				this.getPaperList()
			}).catch(e => {
				this.spinner.hide()
				this.alert.open('删除失败，请稍后再试')
			})
		}
	}

	editPaper(paper: Assess.SimpleAssessPaperItem) {
		this.currentAssesspaperList = paper
		this.spinner.show()
		const req = this.assessPaperProfileReq
		req.assessList = []
		req.code = paper.code
		req.name = paper.name
		req.orgId = paper.orgId
		req.title = paper.title
		this.service.getPaperAssessList(paper.id).then(res => {
			this.spinner.hide()
			const assessList = res.map(item => ({
				assessId: item.assessId,
				seqNo: 0,
			}))
			Object.assign(this.assessPaperProfileReq, { assessList })
			this.editAssessPaper.refreshList()
			this.editModalOpen = true
		})
	}
}
