
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
	copyModalOpen: boolean = false;
	editCategory: boolean = false;
	assesspaperList: Assess.SimpleAssessPaperItem[] = []
	currentAssesspaper: Assess.SimpleAssessPaperItem = new Assess.SimpleAssessPaperItem;
	currentCopyAssesspaper: Assess.SimpleAssessPaperItem = new Assess.SimpleAssessPaperItem;
	assessPaperProfileReq: Assess.AssessPaperProfileReq = new Assess.AssessPaperProfileReq;
	currentCategoryitem: Assess.SimpleAssessCategoryItem[] = []
	categoryList: Assess.SimpleAssessCategoryItem[] = []
	copyYearList: number[] = Array(10).fill(new Date().getFullYear()).map((item, i) => item + i)
	categoryReq: string[] = []
	
	currentPage: number = 0
	maxPage: number = 1
	cgcurrentPage: number = 0
	cgmaxPage: number = 1
	currntCopyYear: number
	
	ngOnInit() {
		this.getPaperList()
		this.getCategoryList()
	}

	getPaperList () {
		this.spinner.show()
		this.service.fetAssesspaperlist(this.currentPage, 10).then((res) => {
			this.spinner.hide()
			let [pageList, assesspaperList] = res
			this.currentPage = pageList.totalPage === pageList.currentPage ? pageList.totalPage - 1 : pageList.currentPage
			this.maxPage = pageList.totalPage
			this.assesspaperList = assesspaperList
		}).catch(res => {
      this.spinner.hide()
      this.alert.open(res)
    })
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
		}).catch(res => {
      this.spinner.hide()
      this.alert.open(res)
    })
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
		}).catch(res => {
      this.spinner.hide()
      this.alert.open(res)
    })
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
		console.log(this.assessPaperProfileReq)
		this.service.updateNewPaper({
			id: this.currentAssesspaper.id,
			...this.assessPaperProfileReq
		}).then(res => {
			this.spinner.hide()		
			this.editModalOpen = false
			this.getPaperList()
		}).catch(res => {
      this.spinner.hide()
      this.alert.open(res)
    })
	}

	get currentCategory () {
		return this.currentCategoryitem.map(c => c.name).join(' ,')
	}

	copyCategory(){
		if (!this.currntCopyYear) return this.alert.open('请选择要复制的年度')
		this.copyModalOpen = false
		// this.currentAssesspaper = paper
		
		this.spinner.show()
		return this.service.copyAssesspaper(this.currentCopyAssesspaper.id, this.currntCopyYear).then(res => {
			this.spinner.hide()
			console.log(123123, res)

			this.getPaperList()
		}).catch(res => {
      this.spinner.hide()
      this.alert.open(res)
    })
	}

	assignCategory(paper: Assess.SimpleAssessPaperItem){
		this.currentAssesspaper = paper
		
		this.spinner.show()
		return this.service.getCategory(this.currentAssesspaper.id).then(res => {
			this.spinner.hide()
			this.editCategory = true  
			this.currentCategoryitem = res.map(r => Object.assign({}, r))

			this.refreshCategory()
		}).catch(res => {
      this.spinner.hide()
      this.alert.open(res)
    })
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
		req.orgIdList = paper.orgIdList
		req.titleList = paper.titleList
		this.service.getPaperAssessList(paper.id).then(res => {
			this.spinner.hide()
			const assessList: Assess.AssessMenuItem[] = []
			res.forEach(group => {
				group.assessItemList.forEach(assess => {
					assessList.push({
						...assess,
						categoryCode: group.code,
						assessCategoryId: group.id,
						categoryName: group.name
					})
				})
			})
			Object.assign(this.assessPaperProfileReq, { assessList })
			this.editAssessPaper.refreshList()
			this.editModalOpen = true
		})
	}
}
