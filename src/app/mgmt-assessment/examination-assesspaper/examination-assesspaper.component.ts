
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
	editCategory: boolean = false;
	assesspaperList: Assess.SimpleAssessPaperItem[] = []
	currentAssesspaper: Assess.SimpleAssessPaperItem = new Assess.SimpleAssessPaperItem
	assessPaperProfileReq: Assess.AssessPaperProfileReq = new Assess.AssessPaperProfileReq;
	currentCategoryitem: Assess.SimpleAssessCategoryItem[] = []
	categoryList: Assess.SimpleAssessCategoryItem[] = []
	categoryReq: string[] = []
	
	currentPage: number = 0
	maxPage: number = 1
	cgcurrentPage: number = 0
	cgmaxPage: number = 1
	
	ngOnInit() {
		this.getPaperList()
		this.getCategoryList()
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
		setTimeout(() => {
			this.newAssessPaper.refreshList()
		}, 0)
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

	getCategoryList () {
		this.spinner.show()
		this.service.fetchCategorylist(this.cgcurrentPage, 10).then((res) => {
			this.spinner.hide()
			let [pageList, categoryList] = res
			this.cgcurrentPage = pageList.currentPage
			this.cgmaxPage = pageList.totalPage
			this.categoryList = categoryList
			this.refreshCategory()
		}).catch(res => this.spinner.hide())
	}

	refreshCategory () {
		this.categoryList.forEach(c => Object.assign(c, { isSelect: false }))
		this.categoryList.forEach(category => {
			this.currentCategoryitem.forEach(req => {
				if (category.id === req.id) {
					Object.assign(category, {isSelect: true})
				}
			})
		})
	}

	cgpageChanged (pageEvent: any) {
		this.cgcurrentPage = pageEvent.currentpage - 1
		this.getCategoryList()
	}

	creatNewCategory() {
		this.spinner.show()
		this.categoryReq = this.currentCategoryitem.map(res => res.id)
		this.service.assignCategory(this.currentAssesspaper.id, this.categoryReq).then(res => {
			this.spinner.hide()
			this.editCategory = false
		})
	}

	submiteEditPaper() {
		let errorMessage = this.editAssessPaper.checkValue()
		if (errorMessage) {
			return this.alert.open(errorMessage)
		}
		
		this.spinner.show()		
		this.service.updateNewPaper({
			id: this.currentAssesspaper.id,
			...this.assessPaperProfileReq
		}).then(res => {
			this.spinner.hide()		
			this.editModalOpen = false
			this.getPaperList()
		}).catch(e => this.spinner.hide())
	}

	get currentCategory () {
		return this.currentCategoryitem.map(c => c.name).join(' ,')
	}

	assignCategory(paper: Assess.SimpleAssessPaperItem){
		this.currentAssesspaper = paper
		
		this.spinner.show()
		return this.service.getCategory(this.currentAssesspaper.id).then(res => {
			this.spinner.hide()
			this.editCategory = true  
			this.currentCategoryitem = res.map(r => Object.assign({}, r))
			console.log(this.currentCategoryitem, res)
			this.refreshCategory()
		}).catch(e => this.spinner.hide())
	}
		
	seletChanged (category: Assess.SimpleAssessCategoryItem) {
		this.currentCategoryitem = this.currentCategoryitem.filter(res => res.id !== category.id)
		if (category.isSelect) {
			this.currentCategoryitem.push(category)
		}
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
		this.currentAssesspaper = paper
		this.spinner.show()
		const req = this.assessPaperProfileReq
		req.assessList = []
		req.code = paper.code
		req.name = paper.name
		req.orgId = paper.orgId
		req.title = paper.title
		this.service.getPaperAssessList(paper.id).then(res => {
			this.spinner.hide()
			const assessList = res
			Object.assign(this.assessPaperProfileReq, { assessList })
			this.editAssessPaper.refreshList()
			this.editModalOpen = true
		})
	}
}
