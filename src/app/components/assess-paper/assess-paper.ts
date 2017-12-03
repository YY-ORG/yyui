import { Component,  OnInit, ViewEncapsulation, Input, ViewChild, ElementRef  } from '@angular/core';

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
  
  @ViewChild('tabBox') tabBox:ElementRef;
  @Input() assessPaperProfileReq: Assess.AssessPaperProfileReq = new Assess.AssessPaperProfileReq;
  newAssessPaper
  addModalOpen: boolean = false
  selectCategoryModal: boolean = false

  assessItemList: Assess.AssessMenuItem[] = [] // 当前试卷的试题列表
  tableAssessItemList: any = {}
  allAssessList: Assess.SimpleAssessItem[] = []  // 所有的试题列表
  cacheAllAssessItemList: Assess.SimpleAssessItem[] = []  // 缓存所有的试题列表
  
  selectassessItemList: Assess.AssessMenuItem[] = []
  organizationList: Adminui.OrganizationItem[] = []

  currentCategory: Assess.SimpleAssessCategoryItem
  selectedTab: string
  categoryList: Assess.SimpleAssessCategoryItem[] = []
  selectedCategoryList: Assess.SimpleAssessCategoryItem[] = []

  professionalTitle: any[] = []
	
	// currentpaper: Assess.paperProfileReq = new Assess.paperProfileReq
	
	currentPage: number = 0
	maxPage: number = 1
	cgcurrentPage: number = 0
	cgmaxPage: number = 1


	ngOnInit() {
    this.getAssessList()
    this.fetchOrganizations()
    this.getCategoryList()
    this.getTitle()
  }

  private fetchOrganizations() {
		this.spinner.show()
    this.service.fetchOrganizations().then(res => {
			this.spinner.hide()
      this.organizationList = res;
    })
  }

  getTitle () {
		this.spinner.show()
    this.service.professionalTitle.then(res => {
			this.spinner.hide()
      this.professionalTitle = res.map(r => ({
        ...r,
        value: +r.value
      }));
      console.log(this.professionalTitle)
    })
  }

  // 新增考题
  addNewAssess () {
    this.refreshAssessList()
    this.addModalOpen = true
  }

	getAssessList () {
		this.spinner.show()
		this.service.fetAssesslist(this.currentPage, 10).then((res) => {
			this.spinner.hide()
      let [pageList, assessItemList] = res
      
			this.currentPage = pageList.totalPage === pageList.currentPage ? pageList.totalPage - 1 : pageList.currentPage
			this.maxPage = pageList.totalPage

			this.allAssessList = assessItemList.map(item => ({
        ...item,
        isSelect: false
      }))
      this.cacheAllAssessItemList = this.allAssessList.map(item => Object.assign({}, item))
      this.refreshAssessList()

		}).catch(res => this.spinner.hide())
  }

  setAssessItemList () {
    this.professionalTitle.forEach(title => Object.assign(title, { selected: false }))
    this.assessPaperProfileReq.titleList.forEach(title => {
      this.professionalTitle.forEach(r => {
        if (r.value === title) {
          Object.assign(r, { selected: true })
        }
      })
    })

    this.organizationList.forEach(org => Object.assign(org, { selected: false }))
    this.assessPaperProfileReq.orgIdList.forEach(id => {
      this.organizationList.forEach(r => {
        if (r.id === id) {
          Object.assign(r, { selected: true })
        }
      })
    })
    
    this.tableAssessItemList = {}
    this.assessPaperProfileReq.assessList.forEach(assess => {
      let obj = this.tableAssessItemList
      let id = assess.assessCategoryId
      if (!obj[id]) obj[id] = []
      obj[id].push(assess)
    })

    this.selectedCategoryList = []
    for (let key in this.tableAssessItemList) {
      let value = this.tableAssessItemList[key][0]
      this.selectedCategoryList.push({
        name: value.categoryName,
        code: value.categoryCode,
        id: value.assessCategoryId,
        isSelect: false
      })
    }
    this.seleteFirstTab()
  }

  seleteFirstTab() {
    setTimeout(() => {
      try{
        const tabs = this.tabBox.nativeElement.querySelectorAll('.slds-tabs--default__link');
        (tabs[0] as HTMLElement).click()
      } catch (e) {}
    })
  }

  deleteGroup(category: Assess.SimpleAssessCategoryItem) {
    this.selectedCategoryList = this.selectedCategoryList.filter(group => group.id !== category.id)
    this.assessItemList = this.assessItemList.filter(assess => {
      assess.assessCategoryId !== category.id
    })
    delete this.tableAssessItemList[category.id]
    this.submiteAssess()
    this.seleteFirstTab()
  }

  refreshAssessList () {
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
  
  refreshList () {
    this.setAssessItemList()
    this.refreshAssessList()
  }

  setSeqNo (assess: Assess.AssessMenuItem, lastIndex: number) {
    assess.seqNo = lastIndex > +assess.seqNo ? assess.seqNo - 1 : +assess.seqNo + 1
    let list = this.orderByPipe.transform(this.assessItemList, 'seqNo').map((assess, i) => {
      return Object.assign({}, assess, {
        seqNo: assess.seqNo > i - 1 ? i + 1 : i
      })
    })
    this.assessItemList = list

    this.tableAssessItemList[this.currentCategory.id] = this.assessItemList
    this.submiteAssess()
  }

  pageChanged (pageEvent: any) {
    this.currentPage = pageEvent.currentpage - 1
    this.getAssessList()
  }

	cgpageChanged (pageEvent: any) {
		this.cgcurrentPage = pageEvent.currentpage - 1
		this.getCategoryList()
  }

	getCategoryList () {
		this.spinner.show()
		this.service.fetchCategorylist(this.cgcurrentPage, 10).then((res) => {
			this.spinner.hide()
			let [pageList, categoryList] = res
			this.cgcurrentPage = pageList.totalPage === pageList.currentPage ? pageList.totalPage - 1 : pageList.currentPage
			this.cgmaxPage = pageList.totalPage
			this.categoryList = categoryList
		}).catch(res => this.spinner.hide())
	}

  creatSeqNo() {
    this.assessItemList.forEach((item, i) => {
      Object.assign(item, { seqNo: i + 1 })
    })
  }

  submiteAssess () {
    this.addModalOpen = false

    this.tableAssessItemList[this.currentCategory.id] = this.assessItemList

    let arr: Assess.SimpleAssessReq[] = []
    for (let key in this.tableAssessItemList) {
      this.tableAssessItemList[key].forEach(assess => {
        arr.push({
          assessCategoryId: key,
          assessId: assess.assessId,
          assessName: assess.assessName,
          assessCode: assess.assessCode,
          seqNo: assess.seqNo
        })
      })
    }

    this.assessPaperProfileReq.assessList = arr
  }

  selectCategoryOpen () {
    this.currentCategory = null
    this.selectCategoryModal = true
  }

  submiteCategory () {
    if (!this.currentCategory) return this.alert.open('请选择一个分组')
    if (this.selectedCategoryList.filter(c=> c.id === this.currentCategory.id).length) return this.alert.open('已经选过此分组')

    this.selectedCategoryList.push(this.currentCategory)

    this.selectCategoryModal = false
    this.selectedTab = this.currentCategory.id
    this.tableAssessItemList[this.currentCategory.id] = []

    setTimeout(() => {
      try {
        const tabs = this.tabBox.nativeElement.querySelectorAll('.slds-tabs--default__link');
        (tabs[tabs.length - 1] as HTMLElement).click()
      } catch (e) {}
    })
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
      title: [this.assessPaperProfileReq.titleList.length, [this.v.min(1)], "请选择职称"],
      orgId: [this.assessPaperProfileReq.orgIdList.length, [this.v.min(1)], "请选择部门"],
      assessList: [this.assessPaperProfileReq.assessList.length, [this.v.min(1)], "考题列表不能为空"],
    }

    return this.v.check(key, regs);
  }

  protected tabChange(category: Assess.SimpleAssessCategoryItem, event: string) {

    if (event === 'inactive') {
      this.tableAssessItemList[category.id] = this.assessItemList
    } else {
      this.currentCategory = category
      console.log(this.currentCategory.id, this.tableAssessItemList[this.currentCategory.id])
      this.assessItemList = this.tableAssessItemList[this.currentCategory.id]
    }
  }

  protected removeDetail(detail: Object) {
    // this.se = this.details.filter((d) => d !== detail);
    // setTimeout(() => this.selectedTab = 'sum');
  }

  titleCheck () {
    this.assessPaperProfileReq.titleList = this.professionalTitle.filter(res => res.selected).map(r => r.value)
    this.checkValue('title')
  }

  organizationCheck () {
     this.assessPaperProfileReq.orgIdList = this.organizationList.filter(res => (res as any).selected).map(r => r.id)
     this.checkValue('orgId')
  }

  get seqNoList () {
    return Array(this.assessItemList.length).fill(0).map((x,i) => i + 1);
  }
}

