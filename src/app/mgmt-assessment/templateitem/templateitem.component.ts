import { Component,  OnInit, ViewEncapsulation, ViewChild  } from '@angular/core';

import { INglDatatableSort, INglDatatableRowClick } from 'ng-lightning/ng-lightning';
import { SpinnerComponent } from '../../../components'
import { PageClass } from '../../../class/page/page.class'
import { TemplateitemService } from './templateitem.service'
import { TemplateitemComponent } from '../../components/assess-templateitem/assess-templateitem'

import { Adminui, Assess, Common } from '../../../core';


@Component({
	selector: 'templateitem',
	styleUrls: ["./templateitem.scss"],
	templateUrl: "./templateitem.template.html"
})
export class ExaminationTemplateitemComponent extends PageClass implements OnInit {
	constructor(
    private service: TemplateitemService
	) {
		super()
	}

	@ViewChild('newAssessTemplateitem') newAssessTemplateitem: TemplateitemComponent;
	@ViewChild('assessTemplateitem') assessTemplateitem: TemplateitemComponent;

	willDeleteUser;
	editModalOpen: boolean = false;
	addModalOpen: boolean = false;
	templateitemList: Assess.SimpleTemplateItem[] = []
  currentTemplateitem: Assess.SimpleTemplateItem = new Assess.SimpleTemplateItem;
  assessProfileReq: Assess.TemplateItemProfileReq = new Assess.TemplateItemProfileReq;
	
	currentPage: number = 0
	maxPage: number = 1


	ngOnInit() {
		this.getTemplateitemList()
	}

	getTemplateitemList () {
		this.spinner.show()
		this.service.fetchTemplateitemlist(this.currentPage, 10).then((res) => {
			this.spinner.hide()
			let [pageList, templateitemList] = res
			this.currentPage = pageList.totalPage === pageList.currentPage ? pageList.totalPage - 1 : pageList.currentPage
			this.maxPage = pageList.totalPage
			this.templateitemList = templateitemList
		}).catch(res => {
      this.spinner.hide()
      this.alert.open(res)
    })
	}

	pageChanged (pageEvent: any) {
		this.currentPage = pageEvent.currentpage - 1
		this.getTemplateitemList()
	}
	
	submiteTemplateitem() {
		const errorMessage = this.newAssessTemplateitem.checkValue()
		if (errorMessage) return this.alert.open(errorMessage)

		this.spinner.show()
		this.service.creatNewTemplateitem(this.assessProfileReq).then(res => {
			this.spinner.hide()
			this.addModalOpen = false
			this.getTemplateitemList()
		})
	}

	addNewTemplateitem () {
		this.assessProfileReq = new Assess.TemplateItemProfileReq
		this.addModalOpen = true
	}
	
	deleteTemplateitem(templateitem: Assess.SimpleTemplateItem) {
		this.confirm.open("确定要删除此元素吗？")
		this.onConfirm = () => {
			this.confirm.close()
			this.spinner.show()
			this.service.deleteTemplateitem(templateitem.id).then(res => {
				this.spinner.hide()
				this.alert.open('删除成功')
				this.getTemplateitemList()
			}).catch(e => {
				this.spinner.hide()
				this.alert.open('删除失败，请稍后再试')
			})
		}
	}

	editTemplateitem(templateitem: Assess.SimpleTemplateItem) {
		this.assessProfileReq = {
			code: templateitem.code,
			defaultValue: templateitem.defaultValue,
			label: templateitem.label,
			name: templateitem.name,
			placeHolder: templateitem.placeholderTip,
			tip: templateitem.tip,
			type: templateitem.type,
			valueField: templateitem.valueField,
			valueOwner: templateitem.valueOwner 
		}
		this.currentTemplateitem = templateitem
		this.editModalOpen = true
	}

	submiteEditTemplateitem() {
		const errorMessage = this.assessTemplateitem.checkValue()
		if (errorMessage) return this.alert.open(errorMessage)

		this.spinner.show()
		this.service.updateNewTemplateitem({
			...this.assessProfileReq,
			id: this.currentTemplateitem.id
		}).then(res => {
			this.spinner.hide()
			this.editModalOpen = false
			this.getTemplateitemList()
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

