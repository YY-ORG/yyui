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

  setTemplateItemList () {
    console.log(this.templateItemItemList)
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
    let regs: ValidationRegs = {
      score: [this.score, [this.vComment.isUnBlank, this.vComment.min(0), this.vComment.max(100)], "分值范围在0-100之间"],
      scoreComment: [this.scoreComment, [this.vComment.isUnBlank], "请输入评分意见"]
    }
    console.log(this.vComment)
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

	getRegList () {
		
    let regs = {}
    this.templateItemItemList.forEach(temp => {
      let reg = []

      // reg.push(this.v.isBase)
      if (temp.mandatory) reg.push(this.v.isUnBlank)
      if (['5', '10'].indexOf(temp.type.toString()) > -1) reg.push(this.v.isNumber)
      if (temp.type.toString() === '10') reg.push(this.v.max(100), this.v.min(0))
      if (temp.type.toString() === '11') reg.push(this.v.isPoint)

      if (temp.regExp) reg.push(temp.regExp.split(',').map(val => this.v[val]))

      regs[temp.code] = [temp.reqDate.value, reg, temp.tip || '输入有误，请检查']
    })
    this.regList = regs
  }

  submit () {
    switch (this.code) {
      case 'TABLE':
        return this.service.putAssessanswer(this.assessPaper.id, this.assess.assessId, this.group.id)
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
        return this.service.postSingleAssessanswer(this.assessPaper.id, this.assess.assessId, this.group.id, this.reqData)
    }
  }

  get isFristComment () {
    return this.commentType === 1
  }

  submitComment () {
    if (!this.commentReq) return false
    const sendCommentServer = this.isFristComment  ? this.service.postMarkassessanswer.bind(this.service) : this.service.postAuditassessanswer.bind(this.service)
    return sendCommentServer(this.assessPaper.id, this.assess.assessId, {
      assessAnswerId: this.commentReq.answerId,
      assessAnswerItemId: this.commentReq.id,
      comments: this.scoreComment, // isFristComment ? this.commentReq.markedComment : this.commentReq.auditComment,
      score: this.score // isFristComment ? this.commentReq.markedScore : this.commentReq.auditScore
    }).then(res => {
      console.log(res)
    }).catch(res => {
      this.spinner.hide()
      this.alert.open(res)
    })
  }

  sendEditComment () {
    this.examinationAssessEdit.submitComment().then(res => {
      this.editModalOpen = false
      this.getFormValue()
      // this.setComment() // 评分设置
    })
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

  submitEditFrom () {
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
		return service.bind(this.service)(this.assessPaper.id, this.assess.assessId, this.group.id, this.assessanswer.id, this.reqData)
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
    return this.globalDisable || this.commentType
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

  onEditorCreated(quill) {
    this.editor = quill;
    if (this.globalDisable || this.commentType) {
      this.editor.disable()
    }
  }

  get isTable () {
    return this.code === 'TABLE'
  }

  onContentChanged({ quill, html, text }) {
	}
}

