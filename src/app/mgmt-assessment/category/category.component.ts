import { Component,  OnInit, ViewEncapsulation, ViewChild  } from '@angular/core';

import { INglDatatableSort, INglDatatableRowClick } from 'ng-lightning/ng-lightning';
import { SpinnerComponent } from '../../../components'
import { PageClass } from '../../../class/page/page.class'
import { AssessCategoryService } from './category.service'
import { AssessCategoryComponent } from '../../components/assess-category/assess-category'

import { Adminui, Assess, Common } from '../../../core';


@Component({
	selector: 'category',
	styleUrls: ["./category.scss"],
	templateUrl: "./category.template.html"
})
export class ExaminationCategoryComponent extends PageClass implements OnInit {
	constructor(
    private service: AssessCategoryService
	) {
		super()
	}

	@ViewChild('newAssessCategory') newAssessCategory: AssessCategoryComponent;
	@ViewChild('assessCategory') assessCategory: AssessCategoryComponent;

	willDeleteUser;
	editModalOpen: boolean = false;
	addModalOpen: boolean = false;
	categoryList: Assess.SimpleAssessCategoryItem[] = []
  currentCategory: Assess.SimpleAssessCategoryItem = new Assess.SimpleAssessCategoryItem;
  assessProfileReq: Assess.AssessCategoryReq = new Assess.AssessCategoryReq;
	
	currentPage: number = 0
	maxPage: number = 1


	ngOnInit() {
		this.getCategoryList()
	}

	getCategoryList () {
		this.spinner.show()
		this.service.fetchCategorylist(this.currentPage, 10).then((res) => {
			this.spinner.hide()
			let [pageList, categoryList] = res
			this.currentPage = pageList.currentPage
			this.maxPage = pageList.totalPage
			this.categoryList = categoryList
		}).catch(res => this.spinner.hide())
	}

	pageChanged (pageEvent: any) {
		this.currentPage = pageEvent.currentpage
		this.getCategoryList()
	}
	
	submiteCategory() {
		const errorMessage = this.newAssessCategory.checkValue()
		if (errorMessage) return this.alert.open(errorMessage)

		this.spinner.show()
		this.service.creatNewCategory(this.assessProfileReq).then(res => {
			this.spinner.hide()
			this.addModalOpen = false
			this.getCategoryList()
		})
	}

	addNewCategory () {
		this.assessProfileReq = new Assess.AssessCategoryReq
		this.addModalOpen = true
	}
	
	deleteCategory(category: Assess.SimpleAssessCategoryItem) {
		this.confirm.open("确定要删除此分组吗？")
		this.onConfirm = () => {
			this.confirm.close()
			this.spinner.show()
			this.service.deleteCategory(category.id).then(res => {
				this.spinner.hide()
				this.alert.open('删除成功')
				this.getCategoryList()
			}).catch(e => {
				this.spinner.hide()
				this.alert.open('删除失败，请稍后再试')
			})
		}
	}

	editCategory(category: Assess.SimpleAssessCategoryItem) {
		this.assessProfileReq = category
		this.currentCategory = category
		this.editModalOpen = true
	}

	submiteEditCategory() {
		const errorMessage = this.assessCategory.checkValue()
		if (errorMessage) return this.alert.open(errorMessage)

		this.spinner.show()
		this.service.updateNewCategory({
			...this.assessProfileReq,
			id: this.currentCategory.id
		}).then(res => {
			this.spinner.hide()
			this.editModalOpen = false
			this.getCategoryList()
		})
	}

	onConfirm() {
		this.confirm.close()

		setTimeout(() => {
			this.alert.open("删除成功")
		}, 1000)
		console.log("23")
	}

}

