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
  }

  export class AssessMenuItem {
    assessCode: string //, optional),
    assessId: string //, optional),
    assessName: string //, optional),
    seqNo: number //, optional)
  }

  export class AssessPaperItem {
    code: string //, optional),
    createDate: Timestamp //, optional),
    creatorId: string //, optional),
    id: string //, optional),
    name: string //, optional),
    orgId: string //, optional),
    status: string //, optional)
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
    value: string = ""; //, optional)
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
    editable: boolean = true //, optional),
    mandatory: boolean = true //, optional),
    seqNo: number = 0 //, optional),
    templateItemId: string = '' //, optional),
    visible: boolean = true //, optional)
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
}
