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
    valueSource: string = '' //, optional),
    visible: boolean //, optional)
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
    orgId: string = "" // , optional),
    status: string = "" // , optional),
    title: string = "" // , optional)
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
    valueSource: string = '' //, optional)
    isSelect: boolean = false
    editable: boolean = true
    mandatory: boolean = true
    visible: boolean = true
  }
  export class SimpleAssessItem {
    code: string = '' //, optional),
    id: string = '' //, optional),
    name: string = '' //, optional),
    status: string = '' //, optional),
    type: string = '' //, optional)
  }
  export class SimpleTemplate {
    code: string = '' //, optional),
    id: string = '' //, optional),
    name: string = '' //, optional),
    status: string = '' //, optional),
    type: string = '' //, optional)
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

}
