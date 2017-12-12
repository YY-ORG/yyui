import { Component,  OnInit, ViewEncapsulation, ViewChild  } from '@angular/core';

import { INglDatatableSort, INglDatatableRowClick } from 'ng-lightning/ng-lightning';
import { Validation, ValidationRegs, SpinnerComponent } from '../../../components'
import { PageClass } from '../../../class/page/page.class'
import { ExaminationTemplateService } from './examination-template.service'
import { AssessTemplateComponent } from '../../components/assess-template/assess-template'

import { Adminui, Assess, Common } from '../../../core';


@Component({
	selector: 'examination-template',
	styleUrls: ["./examination-template.scss"],
	templateUrl: "./examination-template.template.html"
})
export class ExaminationTemplateComponent extends PageClass implements OnInit {
	constructor(
		public v: Validation,
    public newv: Validation,
    private service: ExaminationTemplateService
	) {
		super()
    this.v.result = {}
    this.newv.result = {}
	}

	willDeleteUser;
	editModalOpen: boolean = false;
	addModalOpen: boolean = false;
	templateList: Assess.SimpleTemplate[] = []
	templateProfileReq: Assess.TemplateProfileReq = new Assess.TemplateProfileReq
	currentTemplate: Assess.SimpleTemplate = new Assess.SimpleTemplate

	@ViewChild('newAssessTemplate') newAssessTemplate: AssessTemplateComponent;
	@ViewChild('assessTemplate') assessTemplate: AssessTemplateComponent;
	
	currentPage: number = 0
	maxPage: number = 1


	ngOnInit() {
		this.getTemplateList()
	}
	
	getTemplateList () {
		this.spinner.show()
		this.service.fetchTemplatelist(this.currentPage, 10).then((res) => {
			this.spinner.hide()
			let [pageList, templateList] = res
			this.currentPage = pageList.totalPage === pageList.currentPage ? pageList.totalPage - 1 : pageList.currentPage
			this.maxPage = pageList.totalPage

			this.templateList = templateList
		}).catch(res => {
      this.spinner.hide()
      this.alert.open(res)
    })
	}

	pageChanged (pageEvent: any) {
		this.currentPage = pageEvent.currentpage - 1
		this.getTemplateList()
	}

	addNewTemplate () {
		this.templateProfileReq = new Assess.TemplateProfileReq
		this.newAssessTemplate.refreshList()
		this.addModalOpen = true
	}

	submiteNewTemplate () {
		let errorMessage = this.newAssessTemplate.checkValue()
		if (errorMessage) {
			return this.alert.open(errorMessage)
		}

		this.spinner.show()		
		this.service.postTemplate(this.templateProfileReq).then(res => {
			this.spinner.hide()		
			this.addModalOpen = false
			this.getTemplateList()
		}).catch(res => {
      this.spinner.hide()
      this.alert.open(res)
    })
	}

	submiteEditTemplate() {
		let errorMessage = this.assessTemplate.checkValue()
		if (errorMessage) {
			return this.alert.open(errorMessage)
		}
		
		this.spinner.show()		
		this.service.editTemplate({
			id: this.currentTemplate.id,
			...this.templateProfileReq
		}).then(res => {
			this.spinner.hide()		
			this.editModalOpen = false
			this.getTemplateList()
		}).catch(res => {
      this.spinner.hide()
      this.alert.open(res)
    })
	}
		
	deleteTemplate(template: Assess.SimpleTemplate) {
		this.confirm.open("确定要删除此模板吗？")
		this.onConfirm = () => {
			this.confirm.close()
			this.spinner.show()
			this.service.deleteTemplate(template.id).then(res => {
				this.spinner.hide()
				this.alert.open('删除成功')
				this.getTemplateList()
			}).catch(e => {
				this.spinner.hide()
				this.alert.open('删除失败，请稍后再试')
			})
		}
	}

	editTemplate(template: Assess.SimpleTemplate) {
		this.currentTemplate = template
		this.spinner.show()
		const req = this.templateProfileReq
		req.itemList = []
		req.code = template.code
		req.name = template.name
		req.type = template.type
		this.service.fetchTemplateitem(template.id).then(res => {
			this.spinner.hide()
			const itemList = res.map(item => ({
				editable: item.editable,
				mandatory: item.mandatory,
				seqNo: 0,
				templateItemId: item.id,
				visible: item.visible
			}))
			Object.assign(this.templateProfileReq, { itemList })
			this.assessTemplate.refreshList(res)
			this.editModalOpen = true
		})
	}
}

