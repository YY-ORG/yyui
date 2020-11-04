import * as Ass from './assess-mgmt-controller.model'

export namespace Assess {
  export class AssessItem {
    code: string = '' //, optional),
    createDate: Timestamp = new Timestamp //, optional),
    id: string = '' //, optional),
    name: string = '' //, optional),
    status: string = '' //, optional),
    templateItemList: TemplateItem[] = [] //[TemplateItem], optional),
    type: string = '' //, optional),
    updateDate: Timestamp = new Timestamp //, optional)
  }
  export class Timestamp {
    date: number //, optional),
    day: number //, optional),
    hours: number //, optional),
    minutes: number //, optional),
    month: number //, optional),
    nanos: number //, optional),
    seconds: number //, optional),
    time: number //, optional),
    timezoneOffset: number //, optional),
    year: number //, optional)
  }
  export class TemplateItem {
    code: string = '' //, optional),
    createDate: Timestamp = new Timestamp //, optional),
    id: string = '' //, optional),
    name: string = '' //, optional),
    status: string = '' //, optional),
    templateItemItemList: TemplateItemItem[] = [] //[TemplateItemItem], optional),
    type: string = '' //, optional),
    updateDate: Timestamp = new Timestamp //, optional)
  }
  export class TemplateItemItem {
    code: string = '' //, optional),
    createDate: Timestamp = new Timestamp //, optional),
    defaultValue: string = '' //, optional),
    editable: boolean //, optional),
    id: string = '' //, optional),
    label: string = '' //, optional),
    mandatory: boolean //, optional),
    name: string = '' //, optional),
    optionType: string = '' //, optional),
    placeholderTip: string = '' //, optional),
    regExp: string = '' //, optional),
    regExpExc: string = '' //, optional),
    seqNo: number //, optional),
    status: string = '' //, optional),
    tip: string = '' //, optional),
    type: string = '' //, optional),
    updateDate: Timestamp = new Timestamp //, optional),
    valueField: string = "" //, optional),
    valueOwner: string = "" //, optional)
    visible: boolean //, optional)
    point1?: string = ""; //, optional)
    point2?: string = ""; //, optional)
    reqDate: AssessTIItemReq = new AssessTIItemReq
    failedMsg: string = ''
    maxValue: string = ''
    minValue: string = ''
    scEditable: boolean = true
    scVisible: boolean = true
    auEditable: boolean = true
    auVisible: boolean = true
    exEditable: boolean = true
    exVisible: boolean = true
    templateItemId: string = ''
    valueFrom: string = ''
  }

  export class AssessMenuItem {
    assessCode: string //, optional),
    assessId: string //, optional),
    assessName: string //, optional),
    seqNo: number //, optional)
    categoryCode?: string
    assessCategoryId?: string
    categoryName?: string
    exEditable: boolean = true
    scEditable: boolean = true
    auEditable: boolean = true
  }

  export class AssessGroupItem {
    assessItemList: AssessMenuItem[] //[AssessMenuItem], optional),
    code: string //, optional),
    id: string //, optional),
    name: string //, optional)
  }

  export class AssessPaperItem {
    code: string //, optional),
    createDate: Timestamp //, optional),
    creatorId: string //, optional),
    id: string //, optional),
    name: string //, optional),
    orgId: string //, optional),
    status: string //, optional)
    annual: number
  }

  export class AssessTemplateReq {
    itemList: AssessTIItemReq[]; //[AssessTIItemReq], optional),
    seqNo: number; //, optional),
    templateId: string; //, optional)
  }
  export class AssessTIItemReq {
    code: string = ""; //, optional),
    id: string = ""; //, optional),
    name: string = ""; //, optional),
    value: string | number = ""; //, optional)
  }
  export class SimpleAssessPaperItem {
    code: string = "" // , optional),
    id: string = "" // , optional),
    name: string = "" // , optional),
    orgIdList: string[] = [] // , optional),
    status: string = "" // , optional),
    titleList: string[] = [] // , optional)
  }
  export class SimpleTemplateItem {
    code: string = '' //, optional),
    defaultValue: string = '' //, optional),
    id: string = '' //, optional),
    label: string = '' //, optional),
    name: string = '' //, optional),
    placeholderTip: string = '' //, optional),
    status: string = '' //, optional),
    tip: string = '' //, optional),
    type: string = '' //, optional),
    valueField: string = "" //, optional),
    valueOwner: string = "" //, optional)
    isSelect: boolean = false
    editable: boolean = true
    mandatory: boolean = true
    visible: boolean = true
    seqNo: number = 0
    failedMsg: string = ''
    maxValue: string = ''
    minValue: string = ''
    scEditable: boolean = true
    scVisible: boolean = true
    auEditable: boolean = true
    auVisible: boolean = true
    exEditable: boolean = true
    exVisible: boolean = true
    templateItemId: string = ''
    valueFrom: string = ''
  }
  export class TemplateItemProfileReq {
    code: string = "" //, optional),
    defaultValue: string = "" //, optional),
    label: string = "" //, optional),
    name: string = "" //, optional),
    placeHolder: string = "" //, optional),
    tip: string = "" //, optional),
    type: string = "" //, optional),
    valueField: string = "" //, optional),
    valueOwner: string = "" //, optional)
  }
  export class TemplateItemWithIDProfileReq {
    code: string = "" //, optional),
    defaultValue: string = "" //, optional),
    id: string = "" //, optional),
    label: string = "" //, optional),
    name: string = "" //, optional),
    placeHolder: string = "" //, optional),
    tip: string = "" //, optional),
    type: string = "" //, optional),
    valueField: string = "" //, optional),
    valueOwner: string = "" //, optional)
  }
  export class SimpleAssessItem {
    code: string = '' //, optional),
    id: string = '' //, optional),
    name: string = '' //, optional),
    status: string = '' //, optional),
    type: string = '' //, optional)
    isSelect: boolean = false
    exEditable: boolean = true
    scEditable: boolean = true
    auEditable: boolean = true
  }
  export class SimpleTemplate {
    code: string = '' //, optional),
    id: string = '' //, optional),
    name: string = '' //, optional),
    status: string = '' //, optional),
    type: string = '' //, optional)
    isSelect: boolean = false
    disable: boolean = false
  }
  export class AssessProfileReq {
    code: string = '' //, optional),
    name: string = '' //, optional),
    templateId: string[] = [] //[string], optional),
    type: string = '' //, optional)
  }
  export class AssessWithIDProfileReq {
    code: string = '' //, optional),
    id: string = '' //, optional),
    name: string = '' //, optional),
    templateId: string[] = [] //[string = ''], optional),
    type: string = '' //, optional)
  }
  export class TemplateProfileReq {
    code: string = '' //, optional),
    itemList: TemplateItemMapReq[] = [] //[TemplateItemMapReq], optional),
    name: string = '' //, optional),
    type: string = '' //, optional)
  }
  export class TemplateItemMapReq {
    mandatory: boolean = true //, optional),
    seqNo: number = 0 //, optional),
    templateItemId: string = '' //, optional),
    failedMsg: string = ''
    maxValue: string
    minValue: string
    valueFrom: string = ''
    exVisible: boolean = true
    scVisible: boolean = true
    auVisible: boolean = true
    exEditable: boolean = true
    scEditable: boolean = true
    auEditable: boolean = true
  }
  export class TemplateWithIDProfileReq {
    code: string = '' //, optional),
    id: string = '' //, optional),
    itemList: TemplateItemMapReq[] = [] //[TemplateItemMapReq], optional),
    name: string = '' //, optional),
    type: string = '' //, optional)
  }
  export class AssessPaperProfileReq {
    assessList: SimpleAssessReq[] = [] //[SimpleAssessReq], optional),
    code: string = '' //, optional),
    name: string = '' //, optional),
    orgIdList: string[] = [] //, optional),
    titleList: string[] = [] //, optional)
  }
  export class SimpleAssessReq {
    assessId: string = '' //, optional),
    assessCategoryId: string = '' //, optional),
    seqNo: number = 0 //, optional)
    assessCode: string //, optional),
    assessName: string //, optional),
    exEditable: boolean
    scEditable: boolean
    auEditable: boolean
  }
  export class AssessPaperWithIDProfileReq {
    id: string = '' //, optional),
    assessList: SimpleAssessReq[] = [] //[SimpleAssessReq], optional),
    code: string = '' //, optional),
    name: string = '' //, optional),
    orgIdList: string[] = [] //, optional),
    titleList: string[] = [] //, optional)
  }
  export class AssessCategoryReq {
    code: string = "" //, optional),
    name: string = "" //, optional)
  }
  export class AssessCategoryItem {
    code: string = "" //, optional),
    creatorId: string = "" //, optional),
    id: string = "" //, optional),
    name: string = "" //, optional),
    status: string = "" //, optional)
  }
  export class AssessCategoryWithIDReq {
    code: string = "" //, optional),
    id: string = "" //, optional),
    name: string = "" //, optional)
  }
  export class SimpleAssessCategoryItem {
    code: string = "" //, optional),
    id: string = "" //, optional),
    name: string = "" //, optional)
    isSelect: boolean = false //, optional)
  }
  export class ComplexTemplateItem {
    code: string = '' // , optional),
    defaultValue: string = '' // , optional),
    editable: boolean // , optional),
    id: string = '' // , optional),
    label: string = '' // , optional),
    mandatory: boolean // , optional),
    name: string = '' // , optional),
    placeholderTip: string = '' // , optional),
    reliedId: string = '' // , optional),
    seqNo: number = 0 // , optional),
    status: string = '' // , optional),
    tip: string = '' // , optional),
    type: string = '' // , optional),
    valueField: string = '' // , optional),
    valueOwner: string = '' // , optional),
    visible: boolean // , optional)
  }
  export class SimpleAssessAnswerItem {
    detailList: SimpleAssessAnswerDetailItem[] // [SimpleAssessAnswerDetailItem], optional),
    id: string // , optional),
    seqNo: number // , optional),
    templateId: string // , optional),
    answerId?: string
    type: string // , optional)
  }
  export class SimpleAssessAnswerDetailItem {
    id: string // , optional),
    itemCode: string // , optional),
    itemValue: string // , optional)
  }
  export class SimpleAssessPaperAnswerItem {
    auditedCount: number //, optional),
    code: string //, optional),
    doingCount: number //, optional),
    doneCount: number //, optional),
    groupAnswerItemList: SimpleAssessGroupAnswerItem[] //[SimpleAssessGroupAnswerItem], optional),
    id: string //, optional),
    markedCount: number //, optional),
    name: string //, optional),
    totalCount: number //, optional),
    status: number //, optional),
    unstartedCount: number //, optional)
  }
  export class SimpleAssessGroupAnswerItem {
    auditedCount: number //, optional),
    doingCount: number //, optional),
    doneCount: number //, optional),
    groupCode: string //, optional),
    groupId: string //, optional),
    groupName: string //, optional),
    markedCount: number //, optional),
    totalCount: number //, optional),
    unstartedCount: number //, optional)
  }
  export class AssessPaperExamineeMapItem {
    id: string
    assessPaperId: string //, optional),
    assessPaperName: string //, optional),
    auditScore: number //, optional),
    markedScore: number //, optional),
    orgId: string //, optional),
    orgName: string //, optional),
    status: string //, optional),
    title: string //, optional),
    userId: string //, optional),
    userName: string //, optional)
  }  
  export class MarkedAssessAnswer {
    auditComment: string // 复核评论
    auditScore: number // 复核得分
    auxiliaryScore: number // 系统辅助得分
    id: string // 答案id
    answerId?: string
    itemList: MarkedAssessAnswerItem[] //[MarkedAssessAnswerItem], optional),
    markedComment?: string // 初评评论
    markedScore?: number //, 初评得分
    rauditScore?: number // 实际复核得分
    rmarkedScore?: number //, 实际初评得分
    scoringThreshold?: number // 累加不超过限额的值 或 百分比
    scoringType?: string // 计分类型  doneCount unstartedCount markedCount
  }
  export class MarkedAssessAnswerItem {
    auditComment: string //, optional),
    auditScore: number //, optional),
    answerId?: string
    auxiliaryScore: number //, optional),
    detailList: SimpleAssessAnswerDetailItem[] //[SimpleAssessAnswerDetailItem], optional),
    id: string //, optional),
    markedComment: string //, optional),
    markedScore: number //, optional),
    rauditScore: number //, optional),
    rmarkedScore: number //, optional),
    seqNo: number //, optional),
    templateId: string //, optional),
    type: string //, optional)
  }
  export class ApAcScoringItem {
    apAcId: string //, optional),
    code: string //, optional),
    id: string //, optional),
    name: string //, optional),
    ratio: number //, optional),
    threshold: number //, optional)
    ratioError: string
    thresholdError: string
  }
  export class ApAcScoringReq {
    apacId: string //, optional),
    id: string //, optional),
    ratio: number //, optional),
    threshold: number //, optional)
  }
  export class ApAssessScoringItem {
    apAssessId: string //, optional),
    code: string //, optional),
    id: string //, optional),
    itemThreshold: number //, optional),
    name: string //, optional),
    ratio: number //, optional),
    seqNo: number //, optional),
    threshold: number //, optional)
    ratioError: string
    thresholdError: string
    itemThresholdError: string
  }
  export class ApAssessScoringReq {
    apAssessId: string //, optional),
    assessId: string //, optional),
    itemThreshold: number //, optional),
    ratio: number //, optional),
    threshold: number //, optional)
  }
  export class AssessAnswerScoringReq {
    assessAnswerId: string //, optional),
    assessAnswerItemId: string //, optional),
    comments: string //, optional),
    score: number //, optional)
  }
}
