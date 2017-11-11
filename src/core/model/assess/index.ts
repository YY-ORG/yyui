import * as Ass from './assess-mgmt-controller.model'

export namespace Assess {
  export class AssessItem {
    code : string = '' //, optional),
    createDate : Timestamp = new Timestamp //, optional),
    id : string = '' //, optional),
    name : string = '' //, optional),
    status : string = '' //, optional),
    templateItemList : TemplateItem[] = [] //[TemplateItem], optional),
    type : string = '' //, optional),
    updateDate : Timestamp = new Timestamp //, optional)
  }
  export class Timestamp {
    date : number //, optional),
    day : number //, optional),
    hours : number //, optional),
    minutes : number //, optional),
    month : number //, optional),
    nanos : number //, optional),
    seconds : number //, optional),
    time : number //, optional),
    timezoneOffset : number //, optional),
    year : number //, optional)
  }
  export class TemplateItem {
    code : string = '' //, optional),
    createDate : Timestamp = new Timestamp //, optional),
    id : string = '' //, optional),
    name : string = '' //, optional),
    status : string = '' //, optional),
    templateItemItemList : TemplateItemItem[] = [] //[TemplateItemItem], optional),
    type : string = '' //, optional),
    updateDate : Timestamp = new Timestamp //, optional)
  }
  export class TemplateItemItem {
    code : string = '' //, optional),
    createDate : Timestamp = new Timestamp //, optional),
    defaultValue : string = '' //, optional),
    editable : boolean //, optional),
    id : string = '' //, optional),
    label : string = '' //, optional),
    mandatory : boolean //, optional),
    name : string = '' //, optional),
    optionType : string = '' //, optional),
    placeholderTip : string = '' //, optional),
    regExp : string = '' //, optional),
    regExpExc : string = '' //, optional),
    seqNo : number //, optional),
    status : string = '' //, optional),
    tip : string = '' //, optional),
    type : string = '' //, optional),
    updateDate : Timestamp = new Timestamp //, optional),
    valueSource : string = '' //, optional),
    visible : boolean //, optional)
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
}