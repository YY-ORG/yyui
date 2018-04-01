import { Component,  OnInit, ViewEncapsulation, Input, ViewChild  } from '@angular/core';

import { INglDatatableSort, INglDatatableRowClick } from 'ng-lightning/ng-lightning';
import { Validation, ValidationRegs, SpinnerComponent, AlertComponent } from '../../../components'
import { PageClass } from '../../../class/page/page.class'
import { AssessQuestionsService } from './assess-questions.service'

import { Adminui, Assess, Common } from '../../../core';


@Component({
	selector: 'assess-questions',
	styleUrls: ["./assess-questions.scss"],
	templateUrl: "./assess-questions.template.html"
})
export class AssessQuestionsComponent extends PageClass implements OnInit {
	constructor(
		public v: Validation,
    private service: AssessQuestionsService
	) {
		super()
    this.v.result = {}
	}
  
  @Input() assessProfileReq: Assess.AssessProfileReq = new Assess.AssessProfileReq;

	templateList: Assess.SimpleTemplate[] = []
	cacheTemplateList: Assess.SimpleTemplate[] = []
	
	currentTemplate: Assess.AssessProfileReq = new Assess.AssessProfileReq
	
	currentPage: number = 0
	maxPage: number = 1


	ngOnInit() {
    this.getTemplateitemList()
  }

	getTemplateitemList () {
		this.spinner.show()
		this.service.fetchTemplatelist(this.currentPage, 10).then((res) => {
			this.spinner.hide()
			let [pageList, templateList] = res
			this.currentPage = pageList.totalPage === pageList.currentPage ? pageList.totalPage - 1 : pageList.currentPage
			this.maxPage = pageList.totalPage

			this.templateList = templateList.map(item => ({
        ...item,
        isSelect: false
      }))
      this.cacheTemplateList = this.templateList.map(item => Object.assign({}, item))
      this.refreshList()

		}).catch(res => {
      this.spinner.hide()
      this.alert.open(res)
    })
  }
  
  refreshList () {
    const reqType = this.assessProfileReq.type.toString()
    let currentType: string[] = ['0', '1', '2']
    if (reqType ===  '0' || reqType === '1') {
      currentType = ['0']
    }
    if (reqType ===  '2') {
      currentType = ['2']
    }
    if (reqType === '') {
      currentType = []
    }
    this.templateList = this.cacheTemplateList.map(item => Object.assign({}, item)).filter(item => currentType.indexOf(item.type.toString()) > -1)
    this.templateList.forEach(template => {
      this.assessProfileReq.templateId.forEach(itemid => {
        if (itemid === template.id) {
          template.isSelect = true
        }
      })
    })
  }

	pageChanged (pageEvent: any) {
		this.currentPage = pageEvent.currentpage - 1
		this.getTemplateitemList()
  }

  seletChanged(template: Assess.SimpleTemplate) {

    if (!template.isSelect) {
      this.templateList
        .filter(tem => tem.type === template.type)  
        .forEach(tem => {
          Object.assign(tem, {disable: false})
        })
      this.assessProfileReq.templateId = this.assessProfileReq.templateId.filter(itemid => itemid !== template.id)
      return false
    }

    let inItem = this.assessProfileReq.templateId.filter(itemid => itemid === template.id)
    let isInItem = !!inItem.length
    
    if (!isInItem) {
      this.assessProfileReq.templateId.push(template.id)
    }

    this.templateList
      .filter(tem => tem.type === template.type)  
      .forEach(tem => {
        if (tem.id !== template.id) {
          Object.assign(tem, {disable: true})
        }
      })
  }

  checkValue(key ? : string) {
    let regs: ValidationRegs = {
      name: [this.assessProfileReq.name, [this.v.isUnBlank], "请输入名称"],
      code: [this.assessProfileReq.code, [this.v.isUnBlank], "请输入编码"],
      type: [this.assessProfileReq.type, [this.v.isUnBlank], "请选择类型"],
      items: [this.assessProfileReq.templateId.length, [this.v.min(1)], "请选择考题模板"],
    }

    return this.v.check(key, regs);
  }
}

