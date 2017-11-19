import { Component,  OnInit, ViewEncapsulation, Input, ViewChild  } from '@angular/core';

import { INglDatatableSort, INglDatatableRowClick } from 'ng-lightning/ng-lightning';
import { Validation, ValidationRegs, SpinnerComponent, AlertComponent } from '../../../components'
import { OrderByPipe } from '../../../pipe/orderby'
import { PageClass } from '../../../class/page/page.class'
import { AssesspaperService } from './assess-paper.service'

import { Adminui, Assess, Common } from '../../../core';


@Component({
	selector: 'assess-paper',
	styleUrls: ["./assess-paper.scss"],
	templateUrl: "./assess-paper.template.html"
})
export class AssesspaperComponent extends PageClass implements OnInit {
	constructor(
		public v: Validation,
    private service: AssesspaperService,
    private orderByPipe: OrderByPipe
	) {
		super()
    this.v.result = {}
	}
  
  @Input() assessPaperProfileReq: Assess.AssessPaperProfileReq = new Assess.AssessPaperProfileReq;
  newAssessPaper
  addModalOpen: boolean = false

  assessItemList: Assess.AssessMenuItem[] = [] // 当前试卷的试题列表
  allAssessList: Assess.SimpleAssessItem[] = []  // 所有的试题列表
  cacheAllAssessItemList: Assess.SimpleAssessItem[] = []  // 缓存所有的试题列表
  
  selectassessItemList: Assess.AssessMenuItem[] = []
  organizationList: Adminui.OrganizationItem[] = []
	
	// currentpaper: Assess.paperProfileReq = new Assess.paperProfileReq
	
	currentPage: number = 0
	maxPage: number = 1


	ngOnInit() {
    this.getAssessList()
    this.fetchOrganizations()
  }

  private fetchOrganizations() {
		this.spinner.show()
    this.service.fetchOrganizations().then(res => {
			this.spinner.hide()
      this.organizationList = res;
    })
  }

  // 新增考题
  addNewAssess () {
    this.addModalOpen = true
  }

	getAssessList () {
		this.spinner.show()
		this.service.fetAssesslist(this.currentPage, 10).then((res) => {
			this.spinner.hide()
			let [pageList, assessItemList] = res
			this.currentPage = pageList.currentPage
			this.maxPage = pageList.totalPage

			this.allAssessList = assessItemList.map(item => ({
        ...item,
        isSelect: false
      }))
      this.cacheAllAssessItemList = this.allAssessList.map(item => Object.assign({}, item))
      this.refreshList()

		}).catch(res => this.spinner.hide())
  }

  setAssessItemList () {
    this.assessItemList = this.assessPaperProfileReq.assessList.map(assess => ({
        assessCode: assess.assessCode,
        assessId: assess.assessId,
        assessName: assess.assessName,
        seqNo: assess.seqNo
    }))
  }
  
  refreshList () {
    this.setAssessItemList()
    this.allAssessList = this.cacheAllAssessItemList.map(item => Object.assign({}, item))
    this.allAssessList.forEach(item => {
      this.assessItemList.forEach(assessItem => {
        if (item.id === assessItem.assessId) {
          Object.assign(item, {
            isSelect: true
          })
        }
      })
    })
  }

  setSeqNo (assess: Assess.AssessMenuItem, lastIndex: number) {
    assess.seqNo = lastIndex > +assess.seqNo ? assess.seqNo - 1 : +assess.seqNo + 1
    let list = this.orderByPipe.transform(this.assessItemList, 'seqNo').map((assess, i) => {
      return Object.assign({}, assess, {
        seqNo: assess.seqNo > i - 1 ? i + 1 : i
      })
    })
    this.assessItemList = list
    this.submiteAssess()
  }

	pageChanged (pageEvent: any) {
		this.currentPage = pageEvent.currentpage - 1
		this.getAssessList()
  }

  creatSeqNo() {
    this.assessItemList.forEach((item, i) => {
      Object.assign(item, { seqNo: i + 1 })
    })
  }

  submiteAssess () {
    this.addModalOpen = false
    
    this.assessPaperProfileReq.assessList = this.assessItemList.map(assess => ({
      assessId: assess.assessId,
      assessName: assess.assessName,
      assessCode: assess.assessCode,
      seqNo: assess.seqNo
    }))
  }
  
  seletChanged(assessItem: Assess.SimpleAssessItem) {
    if (!assessItem.isSelect) {
      this.assessItemList = this.assessItemList.filter(item => item.assessId !== assessItem.id)
      this.creatSeqNo()
      return false
    }

    const currentItem: Assess.AssessMenuItem = {
      assessCode: assessItem.code,
      assessId: assessItem.id,
      assessName: assessItem.name,
      seqNo: 0
    }
    let isInItem = false
    this.assessItemList.forEach(item => {
      if (item.assessId === assessItem.id) {
        isInItem = true
        Object.assign(item, currentItem)
      }
    })
    if (!isInItem) {
      this.assessItemList.push(currentItem)
    }
    this.creatSeqNo()
  }

  checkValue(key ? : string) {
    let regs: ValidationRegs = {
      name: [this.assessPaperProfileReq.name, [this.v.isUnBlank], "请输入试卷名称"],
      code: [this.assessPaperProfileReq.code, [this.v.isUnBlank], "请输入编码"],
      title: [this.assessPaperProfileReq.title, [this.v.isUnBlank], "请选择职称"],
      orgId: [this.assessPaperProfileReq.orgId, [this.v.isUnBlank], "请选择部门"],
      assessList: [this.assessPaperProfileReq.assessList.length, [this.v.min(1)], "考题列表不能为空"],
    }

    return this.v.check(key, regs);
  }

  get seqNoList () {
    return Array(this.assessItemList.length).fill(0).map((x,i) => i + 1);
  }
}

