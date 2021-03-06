import { Component,  OnInit, ViewEncapsulation, Input, ViewChild  } from '@angular/core';

import { INglDatatableSort, INglDatatableRowClick } from 'ng-lightning/ng-lightning';
import { Validation, ValidationRegs, SpinnerComponent, AlertComponent } from '../../../components'
import { PageClass } from '../../../class/page/page.class'
import { AssessTemplateService } from './assess-template.service'
import { OrderByPipe } from '../../../pipe/orderby'

import { Adminui, Assess, Common } from '../../../core';
import { executeCopy } from '../../../core/common/copy'


@Component({
	selector: 'assess-template',
	styleUrls: ["./assess-template.scss"],
	templateUrl: "./assess-template.template.html"
})
export class AssessTemplateComponent extends PageClass implements OnInit {
	constructor(
		public v: Validation,
    private orderByPipe: OrderByPipe,
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
  addModalOpen: boolean = false


	ngOnInit() {
    this.getTemplateitemList()
  }

  setSeqNo (assess: Assess.AssessMenuItem, lastIndex: number) {
    assess.seqNo = lastIndex > +assess.seqNo ? assess.seqNo - 1 : +assess.seqNo + 1
    let list = this.orderByPipe.transform(this.selectTemplateitemList, 'seqNo').map((assess, i) => {
      return Object.assign({}, assess, {
        seqNo: assess.seqNo > i - 1 ? i + 1 : i
      })
    })
    this.selectTemplateitemList = list
  }

	getTemplateitemList () {
		this.spinner.show()
		this.service.fetchTemplateitemlist(this.currentPage, 10).then((res) => {
			this.spinner.hide()
			let [pageList, templateitemList] = res
			this.currentPage = pageList.totalPage === pageList.currentPage ? pageList.totalPage - 1 : pageList.currentPage
			this.maxPage = pageList.totalPage

			this.templateitemList = templateitemList.map(item => ({
        ...item,
        failedMsg: '',
        maxValue: '',
        minValue: '',
        valueFrom: '',
        mandatory: true,
        exVisible: true,
        isSelect: false,
        scVisible: true,
        auVisible: true,
        exEditable: true,
        scEditable: true,
        auEditable: true
      }))
      this.cacheTemplateitemList = this.templateitemList.map(item => Object.assign({}, item))
      this.refreshList()

		}).catch(res => {
      this.spinner.hide()
      this.alert.open(res)
    })
  }
  
  refreshList (res?: Assess.SimpleTemplateItem[]) {
    if (res) {
      this.selectTemplateitemList = res
    } 
    this.templateitemList = this.cacheTemplateitemList.map(item => Object.assign({}, item))
    this.templateitemList.forEach(templateitem => {
      this.selectTemplateitemList.forEach(item => {
        if (item.id === templateitem.id) {
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
    this.selectTemplateitemList.forEach((item, i) => {
      Object.assign(item, { seqNo: i + 1 })
    })
  }
  
  seletChanged(templateitem: Assess.SimpleTemplateItem) {
    if (!templateitem.isSelect) {
      this.selectTemplateitemList = this.selectTemplateitemList.filter(item => item.id !== templateitem.id)
      this.creatSeqNo()
      return false
    }

    let inItem = this.selectTemplateitemList.filter(item => item.id === templateitem.id)
    let isInItem = false
    this.selectTemplateitemList.forEach(item => {
      if (item.id === templateitem.id) {
        isInItem = true
        Object.assign(item, templateitem)
      }
    })
    if (!isInItem) {
      this.selectTemplateitemList.push(templateitem)
    }
    this.creatSeqNo()
  }

  setReqList () {
    this.templateProfileReq.itemList = this.selectTemplateitemList.map(templateitem => ({
      mandatory: templateitem.mandatory,
      seqNo: templateitem.seqNo,
      templateItemId: templateitem.id,
      failedMsg: templateitem.failedMsg,
      maxValue: templateitem.maxValue,
      minValue: templateitem.minValue,
      valueFrom: templateitem.valueFrom,
      exVisible: templateitem.exVisible,
      scVisible: templateitem.scVisible,
      auVisible: templateitem.auVisible,
      exEditable: templateitem.exEditable,
      scEditable: templateitem.scEditable,
      auEditable: templateitem.auEditable,
    }))
  }

  checkValue(key ? : string) {
    this.setReqList()
    
    let regs: ValidationRegs = {
      name: [this.templateProfileReq.name, [this.v.isUnBlank], "请输入名称"],
      code: [this.templateProfileReq.code, [this.v.isUnBlank], "请输入编码"],
      type: [this.templateProfileReq.type, [this.v.isUnBlank], "请选择类型"],
      items: [this.templateProfileReq.itemList.length, [this.v.min(1)], "请选择考题模板元素"],
    }

    return this.v.check(key, regs);
  }

  addNewTemplate () {
    this.addModalOpen = true
  }

  submiteAssess () {
    this.addModalOpen = false
  }

  get seqNoList () {
    return Array(this.selectTemplateitemList.length).fill(0).map((x,i) => i + 1);
  }

  copytext (text: string, $event: Event) {
    executeCopy(text, $event.target as HTMLElement)
    alert('复制成功！')
  }

}

