import { Component,  OnInit, ViewEncapsulation, Input, ViewChild  } from '@angular/core';

import { INglDatatableSort, INglDatatableRowClick } from 'ng-lightning/ng-lightning';
import { Validation, ValidationRegs, SpinnerComponent, AlertComponent } from '../../../components'
import { PageClass } from '../../../class/page/page.class'
import { AssessTemplateService } from './assess-template.service'

import { Adminui, Assess, Common } from '../../../core';


@Component({
	selector: 'assess-template',
	styleUrls: ["./assess-template.scss"],
	templateUrl: "./assess-template.template.html"
})
export class AssessTemplateComponent extends PageClass implements OnInit {
	constructor(
		public v: Validation,
    private service: AssessTemplateService
	) {
		super()
    this.v.result = {}
	}
  
  @Input() templateProfileReq: Assess.TemplateProfileReq = new Assess.TemplateProfileReq;

	templateitemList: Assess.SimpleTemplateItem[] = []
	cacheTemplateitemList: Assess.SimpleTemplateItem[] = []
	selectTemplateitemList: Assess.SimpleTemplateItem[] = []
	
	currentTemplate: Assess.TemplateProfileReq = new Assess.TemplateProfileReq
	
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
			this.currentPage = pageList.currentPage
			this.maxPage = pageList.totalPage

			this.templateitemList = templateitemList.map(item => ({
        ...item,
        editable: true,
        mandatory: true,
        visible: true,
        isSelect: false
      }))
      this.cacheTemplateitemList = this.templateitemList.map(item => Object.assign({}, item))
      this.refreshList()

		}).catch(res => this.spinner.hide())
  }
  
  refreshList () {
    this.templateitemList = this.cacheTemplateitemList.map(item => Object.assign({}, item))
    this.templateitemList.forEach(templateitem => {
      this.templateProfileReq.itemList.forEach(item => {
        if (item.templateItemId === templateitem.id) {
          Object.assign(templateitem, item, {isSelect: true})
        }
      })
    })
  }

	pageChanged (pageEvent: any) {
		this.currentPage = pageEvent.currentpage - 1
		this.getTemplateitemList()
  }

  creatSeqNo() {
    this.templateProfileReq.itemList.forEach((item, i) => {
      Object.assign(item, { seqNo: i + 1 })
    })
  }
  
  seletChanged(templateitem: Assess.SimpleTemplateItem) {
    if (!templateitem.isSelect) {
      this.templateProfileReq.itemList = this.templateProfileReq.itemList.filter(item => item.templateItemId !== templateitem.id)
      this.creatSeqNo()
      return false
    }

    const currentItem = {
      editable: templateitem.editable,
      mandatory: templateitem.mandatory,
      seqNo: 0,
      templateItemId: templateitem.id,
      visible: templateitem.visible
    }
    let inItem = this.templateProfileReq.itemList.filter(item => item.templateItemId === templateitem.id)
    let isInItem = false
    this.templateProfileReq.itemList.forEach(item => {
      if (item.templateItemId === templateitem.id) {
        isInItem = true
        Object.assign(item, currentItem)
      }
    })
    if (!isInItem) {
      this.templateProfileReq.itemList.push(currentItem)
    }
    this.creatSeqNo()
  }

  checkValue(key ? : string) {
    let regs: ValidationRegs = {
      name: [this.templateProfileReq.name, [this.v.isUnBlank], "请输入名称"],
      code: [this.templateProfileReq.code, [this.v.isUnBlank], "请输入code"],
      type: [this.templateProfileReq.type, [this.v.isUnBlank], "请选择类型"],
      items: [this.templateProfileReq.itemList.length, [this.v.min(1)], "请选择考题模板元素"],
    }

    return this.v.check(key, regs);
  }
}

