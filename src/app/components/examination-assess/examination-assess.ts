// 下一步 刷新table列表

import { Component,  OnInit, ViewEncapsulation, Input, ViewChild, OnChanges  } from '@angular/core';

import { INglDatatableSort, INglDatatableRowClick } from 'ng-lightning/ng-lightning';
import { Validation, ValidationRegs, SpinnerComponent, AlertComponent } from '../../../components'
import { PageClass } from '../../../class/page/page.class'
import { ExaminationAssessService } from './examination-assess.service'
import { OrderByPipe } from '../../../pipe/orderby' 
import { MyDatePicker } from '../../../components/date-picker/my-date-picker.component'

import { Adminui, Assess, Common } from '../../../core';


@Component({
	selector: 'examination-assess-component',
	styleUrls: ["./examination-assess.scss"],
  templateUrl: "./examination-assess.template.html",
  encapsulation: ViewEncapsulation.None
})
export class ExaminationAssessComponent extends PageClass implements OnInit, OnChanges {
	constructor(
		public v: Validation,
		public vComment: Validation,
    private service: ExaminationAssessService,
		private orderBy: OrderByPipe
	) {
		super()
    this.v.result = {}
    this.vComment.result = {}
	}
  
  @Input() templateFormId: string
  @Input() globalDisable: boolean = false
  @Input() tableList: Assess.TemplateItemItem[] = []
  @Input() tableAssessList: Assess.TemplateItemItem[] = []
  @Input() code: 'FORM' | 'FORM_TABLE' | 'TABLE' = 'FORM'
  @Input() assessPaper: Assess.AssessPaperItem
  @Input() assess: Assess.AssessMenuItem
  @Input() group: Assess.AssessGroupItem
  @Input() templateItemItemList: Assess.TemplateItemItem[]
  @Input() assessanswer: Assess.SimpleAssessAnswerItem // 用户的答案
  @Input() userId: string
  @Input() commentType: 1 | 2
  @Input() isComment: boolean = false
  @Input() commentReq: Assess.MarkedAssessAnswer = new Assess.MarkedAssessAnswer()

  @ViewChild('examinationAssessAdd') public examinationAssessAdd: ExaminationAssessComponent;
  @ViewChild('examinationAssessEdit') public examinationAssessEdit: ExaminationAssessComponent;
  @ViewChild('dataPicker') dataPicker: MyDatePicker;
  
  commentCode: 0 | 1 | 2 | 3 = 0
  
	selectList: Promise<any>[] = []
  regList: any = {}
  currentAssessanswer: Assess.SimpleAssessAnswerItem
  markedAssessAnswer: Assess.MarkedAssessAnswer
  formVluesList: Assess.SimpleAssessAnswerItem[] = []  // 表单的值
  // currentCommentReq: Assess.MarkedAssessAnswerItem = new Assess.MarkedAssessAnswerItem()

  formValue: Assess.SimpleAssessAnswerItem[] = []  // 所有表单的值
  tableTrList: any[] = []  // 表格列表
  isEdit: boolean = false
  
  checkValue: Function
  addModalOpen: boolean = false
  editModalOpen: boolean = false

	public editor;
	public editorContent: string;
	public editorOptions = {
			placeholder: "请输入个人述职...",
			modules: {
				toolbar: [
					['bold', 'italic', 'underline'],
					['code-block'],
					[{ 'list': 'ordered'}, { 'list': 'bullet' }],
					[{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
					[{ 'direction': 'rtl' }],                         // text direction
					[{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
					[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
				
					[{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
					[{ 'align': [] }],
				
					['clean']                                         // remove formatting button
				]
			},
  };
  
  scoreComment: string = ''
  score: number

	ngOnInit() {
  }

  ngOnChanges(changes) {
    this.setTemplateItemList()
    if (this.assessanswer) { // 表格会从外部直接传来用户答案，如果没有传来 再去获取
      this.setFormReq(this.assessanswer)
      this.setCommentReq(this.assessanswer)
    } else {
      this.getFormValue()
    }
  }

  get isTable () {
    return this.templateItemItemList.length === 1 && this.templateItemItemList[0].type === '15'
  }

  catDecimal (item) {
    if (!/\.\d\d/.test(item.reqDate.value + '')) return false // 如果不到两位数不处理
    setTimeout(() => {
      item.reqDate.value = Math.round(+item.reqDate.value * 100) / 100
    })
  }

  setCalculatedValue () {
    this.templateItemItemList.forEach(item => {
      // 计算valueFrom
      if (!item.valueFrom) return
      let v = item.valueFrom

      // 替换Math里所有的方法
      Object.getOwnPropertyNames(Math).forEach(method => v = v.replace(new RegExp(method +'\\('), 'Math.' + method + '('))

      // 替换括号里面的值
      v = v.replace(/{(.*?)}/g, (a, b) => this.getItemReqValueViaCode(b).value + '' )

      try {
        item.reqDate.value = eval(v)
      } catch (e) {}
    })
  }

  setTemplateItemList () {
    this.templateItemItemList = this.templateItemItemList.filter(item => this.isItemVisible(item))
    this.templateItemItemList.forEach(tem => {
      tem.reqDate = {
        code: tem.code,
        id: tem.id,
        name: tem.name,
        value: tem.defaultValue || ""
      }
      if (tem.type == '11') {  // 如果是分数框
        tem.point1 = ''
        tem.point2 = ''
      }
      if (tem.type == '7') {  // 如果是复选框
        tem.reqDate.value = 0
      }
    })
    this.templateItemItemList = this.orderBy.transform(this.templateItemItemList, 'seqNo')

    this.getSelectList()
    this.getRegList()
    this.setCalculatedValue() // 设置计算的关联值

    this.checkValue = (code?: string, value?: string) => {
      this.isEdit = true
      let regs: any = {}

      if (code) {
        this.regList[code][0] = value
        return this.v.check(code, this.regList);
      }
      
      this.templateItemItemList.forEach(item => {
        this.regList[item.code][0] = item.reqDate.value
      })

      return this.v.check(null, this.regList)
    }
  }

  checkCommentValue(key ? : string) {
    this.isEdit = true
    const scoringThreshold = this.commentReq && this.commentReq.scoringThreshold ? this.commentReq.scoringThreshold : 10e10
  
    let regs: ValidationRegs = {
      score: [this.score, [this.vComment.isUnBlank, this.vComment.min(0), this.vComment.max(scoringThreshold)], scoringThreshold === 10e10 ? `分值需大于等于0` : `分值范围在0-${scoringThreshold}之间`],
      scoreComment: [this.scoreComment, [this.vComment.isUnBlank], "请输入评分意见"]
    }
    // console.log(this.vComment)
    return this.vComment.check(key, regs);
  }

	getSelectList () {
		this.templateItemItemList.map((templateItem, c) => {
      const {valueOwner, valueField} = templateItem
      if (['1', '8'].indexOf(templateItem.type.toString()) > -1) {
        Object.assign(templateItem, { selectList: this.service.dict.get({ owner: valueOwner, field: valueField }) })
      }
    })
  }

  private getItemReqValueViaCode (code: string): Assess.AssessTIItemReq {
    let itemReq = new Assess.AssessTIItemReq
    this.templateItemItemList.forEach(item => {
      if (item.code === code.trim()) {
        itemReq = item.reqDate
      }
    })
    return itemReq
  }

  private parseRegString (value: string): Function {
    var matchedString = value.trim().match(/^{(.*)}$/)
    if (matchedString) {
      let [ ,code ] = matchedString
      return () => this.getItemReqValueViaCode(code).value
    } else {
      return () => value
    }
  }

	getRegList () {
    let regs = {}
    this.templateItemItemList.forEach(temp => {
      let reg = []
      let addDefault = (defaultValue, fn) => { 
        if (this.v.isUnBlank(defaultValue)) {
          return (v:any) => {
            return this.v.equalTo(defaultValue)(v) || fn(v)
          }
        } else {
          return (v:any) => fn(v)
        }
       }

       const code = temp.type.toString()

      // reg.push(this.v.isBase)
      if (temp.mandatory) reg.push(this.v.isUnBlank)
      if (code === '5') reg.push(this.v.isInteger)
      if (code === '18') reg.push(this.v.isNumber)

      // 期刊校验
      if (code === '19') {
        reg.push(this.v.isInteger)
        reg.push((v: string) => {
          if (v.length !== 6) return false
          const year = v.slice(0 ,4)
          const month = v.slice(4, 6)
          return 1990 <= +year && +year <= 2100 && 1 <= +month && +month <= 12
        })
      }

      if (code === '11') {
        reg.push(this.v.isPoint)
      } else {
        if (temp.maxValue) reg.push(addDefault(temp.defaultValue, this.v.max(this.parseRegString(temp.maxValue))))
        if (temp.minValue) reg.push(addDefault(temp.defaultValue, this.v.min(this.parseRegString(temp.minValue))))
        if (temp.maxValue || temp.minValue) reg.push(addDefault(temp.defaultValue, this.v.isNumber))
      }

      if (temp.regExp) reg.push(temp.regExp.split(',').map(val => this.v[val]))

      regs[temp.code] = [temp.reqDate.value, reg, temp.failedMsg]
    })
    this.regList = regs
  }

  submit (userId?) {
    switch (this.code) {
      case 'TABLE':
        return this.service.putAssessanswer(this.assessPaper.id, this.assess.assessId, this.group.id, userId)
      case 'FORM_TABLE':
        this.templateItemItemList.forEach(res => {
          if (res.type.toString() === '15') {
            res.reqDate.value = this.tableTrList.map(table => table.id).join(':')
          }
        })
      case 'FORM':
        let errorMsg = this.checkValue()
        if (errorMsg) {
          this.alert.open(errorMsg)
          return Promise.reject(errorMsg)
        }
        return this.service.postSingleAssessanswer(this.assessPaper.id, this.assess.assessId, this.group.id, this.reqData, userId)
    }
  }

  get isFristComment () {
    return this.commentType === 1
  }

  submitComment () {
    // console.log('this.commentReq', this.commentReq)
    let errorMsg = this.checkCommentValue()
    if (errorMsg) {
      this.alert.open(errorMsg)
      return Promise.reject('error')
    }
    if (!this.commentReq) return Promise.reject('error')
    if (!this.commentReq.answerId && this.commentReq.itemList.length) { // 表单和混合表单外层没有answerid
      this.commentReq.id = this.commentReq.itemList[0].id
      this.commentReq.answerId = this.commentReq.itemList[0].answerId
    }
    const sendCommentServer = this.isFristComment  ? this.service.postMarkassessanswer.bind(this.service) : this.service.postAuditassessanswer.bind(this.service)

    return Promise.all([sendCommentServer(this.assessPaper.id, this.assess.assessId, {
      assessAnswerId: this.commentReq.answerId,
      assessAnswerItemId: this.commentReq.id,
      comments: this.scoreComment, // isFristComment ? this.commentReq.markedComment : this.commentReq.auditComment,
      score: this.score // isFristComment ? this.commentReq.markedScore : this.commentReq.auditScore
    }).then(([res1]) => {
      // console.log(res)
      return res1
    }).catch(res => {
      this.spinner.hide()
      this.alert.open(res)
    })])
  }


  get reqData (): Assess.AssessTemplateReq[] {
    return [{
      templateId: this.templateFormId,
      seqNo: 0,
      itemList: this.templateItemItemList.map(item => item.reqDate)
    }]
  }
  
  submitFrom () {
		let errorMsg = this.checkValue()
    if (errorMsg) {
      this.alert.open(errorMsg)
      return Promise.reject(errorMsg)
    }
    
    let service
    switch (this.code) {
      case 'FORM': service = this.service.postSingleAssessanswer
        break;
      case 'FORM_TABLE': service = this.service.postAssessanswerSubanswer
        break;
      case 'TABLE': service = this.service.postAssessanswer
        break;
    }
    
		this.spinner.show()
		return service.bind(this.service)(this.assessPaper.id, this.assess.assessId, this.group.id, this.reqData)
			.then(res => {
				this.spinner.hide()
			}).catch(res => {
        this.spinner.hide()
        this.alert.open(res)
      })
  }

  submitEditFrom (userId?) {
		let errorMsg = this.checkValue()
    if (errorMsg) {
      this.alert.open(errorMsg)
      return Promise.reject(errorMsg)
    }
    
    let service
    switch (this.code) {
      case 'FORM_TABLE': service = this.service.updateAssessanswerSubanswer
        break;
      case 'TABLE': service = this.service.updateAssessanswer
        break;
    }
    
    this.spinner.show()
		return service.bind(this.service)(this.assessPaper.id, this.assess.assessId, this.group.id, this.assessanswer.id, this.reqData, userId)
			.then(res => {
				this.spinner.hide()
			}).catch(res => {
        this.spinner.hide()
        this.alert.open(res)
      })
  }

  submitNewFrom () {
    this.examinationAssessAdd.submitFrom().then(res => {
      this.getFormValue(true)
      this.addModalOpen = false
    })
  }

  submitModelEditFrom () {
    this.examinationAssessEdit.submitEditFrom().then(res => {
      this.getFormValue(true)
      this.editModalOpen = false
    })
  }

  sendEditComment () {
    Promise.all([this.examinationAssessEdit.submitEditFrom(this.userId), this.examinationAssessEdit.submitComment()]).then(res => {
      this.editModalOpen = false
      this.getFormValue()
      // this.setComment() // 评分设置
    })
  }

  getFormValue (isJustTable: boolean = false) {
    this.spinner.show()
    if (this.userId) { // 如果有userid 代表是评分 做评分的逻辑
      this.service.fetchMarkassessanswer(this.assessPaper.id, this.assess.assessId, this.userId).then(res => {
        this.spinner.hide()
        
        this.markedAssessAnswer = res
        this.formValue = res.itemList
        this.setFormValue(isJustTable)
        this.setCommentReq(res)
      })
    } else {
      this.service.fetchAssessanswer(this.assessPaper.id, this.assess.assessId).then(res => {
        this.spinner.hide()
        this.formValue = res
        this.setFormValue(isJustTable)
      })
    }
  }

  setFormValue (isJustTable: boolean = false) {
    let tableTrList: Assess.SimpleAssessAnswerItem[] = []

    if (this.code === 'FORM' || this.code === 'FORM_TABLE') {
      this.formVluesList = this.formValue.filter(r => r.type == '0') //表单的答案
      if(!isJustTable) this.setFormReq(this.formVluesList.length ? this.formVluesList[0] : null)
      tableTrList = this.formValue.filter(r => r.type == '1') // 表单表格混合题的表格答案
    } else if (this.code === 'TABLE') {
      tableTrList = this.formValue.filter(r => r.type == '0') // 表格答案
    }
    this.setTableTrList(tableTrList)
  }

	deleteTableList(tableTr: any) {
		this.confirm.open("确定要删除吗？")
		this.onConfirm = () => {
			this.confirm.close()
      this.spinner.show()
      
      let service
      switch (this.code) {
        case 'FORM_TABLE': service = this.service.deleteFormTableAssessanswers
          break;
        case 'TABLE': service = this.service.deleteTableAssessanswers
          break;
      }
			service.bind(this.service)(this.assessPaper.id, this.assess.assessId, this.group.id, [tableTr.id]).then(res => {
				this.spinner.hide()
				this.alert.open('删除成功')
				this.getFormValue(true)
			}).catch(e => {
				this.spinner.hide()
				this.alert.open('删除失败，请稍后再试')
			})
		}
  }
  
  deleteFile (id: string) {
    this.spinner.show()
    
    this.service.deleteFile(id).then(res => {
				this.spinner.hide()
    }).catch(res => {
      this.spinner.hide()
      this.alert.open(res)
    })
  }

  setFormReq (formVluesList: Assess.SimpleAssessAnswerItem) {
    if (!formVluesList) {
      return false
    }
    
    this.templateItemItemList.forEach(item => {
      formVluesList.detailList.forEach(detail => {
        if(item.reqDate.code === detail.itemCode) {
          item.reqDate.value = detail.itemValue
        }
      })
    })
    
    this.parserReqDate()
  }

  setCommentReq (formVluesList: any) { // 设置评论
    this.commentReq = formVluesList
  }

  parserReqDate () {
    this.templateItemItemList.forEach(item => {
      switch (item.type.toString()) {
        case '2':
          setTimeout(() => {
            this.dataPicker.setInitDate(item.reqDate.value as string)
          })
          break;
        case '11':
          let arr = item.reqDate.value.toString().split('/')
          item.point1 = arr[0]
          item.point2 = arr[1]
          break;
        default: break;
      }
    })
  }

  editModalAssessAnwser (tableTr: any) { // 编辑提取表格答案
    this.currentAssessanswer = this.formValue.filter(value => value.id === tableTr.id)[0]
    this.editModalOpen = true
  }

  commentAssess (tableTr: any) { // 评分提取表格答案
    this.currentAssessanswer = this.commentReq.itemList.filter(item => item.id === tableTr.id)[0]
    
    this.editModalOpen = true
    // console.log(this.currentCommentReq, 'this.currentCommentReq')
    // this.editModalAssessAnwser(tableTr)
  }

  get isDisable () {
    return this.globalDisable
  }

  // 每一个元素是否禁用
  // exEditable 和 exVisible 表示参评的可编辑，可见，
  // scEditable 和 scVisible 表示初评的可编辑，可见
  // auEditable 和 auVisible 表示复核的可编辑，可见
  isItemDisable (templateItem) {
    return this.globalDisable || !(this.commentType === 1 ? templateItem.scEditable : this.commentType === 2 ? templateItem.auEditable : templateItem.exEditable)
  }

  // 每一个元素是否可见
  isItemVisible (templateItem) {
    return this.commentType === 1 ? templateItem.scVisible : this.commentType === 2 ? templateItem.auVisible : templateItem.exVisible
  }

  setTableTrList (tableTrList: Assess.SimpleAssessAnswerItem[]){
    if (!this.tableList.length) return false

    this.tableTrList = []
    tableTrList.forEach(tr => {
      let obj = {
        id : tr.id,
        seqNo : tr.seqNo,
        templateId : tr.templateId
      }

      // 预加载字典
      this.tableList.forEach(table => {
       
        if (['1', '8'].indexOf(table.type.toString()) > -1) {
          Object.assign(table, { selectList: this.service.dict.get({ owner: table.valueOwner, field: table.valueField }) })
        }
      })
      
      this.tableList.forEach(table => {
        tr.detailList.forEach(td => {
          if (td.itemCode === table.code) {
            obj[table.code] = Object.assign({}, td)
            
            // 处理字典里面的值
            let lastValue = obj[table.code].itemValue
            if ((table as any).selectList) {
              obj[table.code].itemValue = (table as any).selectList.then(res => {
                return res.filter(r => r.value === lastValue)[0].displayValue
              })
            } else {
              obj[table.code].itemValue = Promise.resolve(lastValue)
            }
          }
        })
      })
      this.tableTrList.push(obj)
    })
  }
	
  onEditorBlured(quill) {
  }

  onEditorFocused(quill) {
  }

  onEditorCreated(quill, templateItem) {
    this.editor = quill;
    if (this.isItemDisable(templateItem)) {
      this.editor.disable()
    }
  }

  onContentChanged({ quill, html, text }) {
	}
}

