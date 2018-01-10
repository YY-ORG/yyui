// GET /assess//authsec/assess/{_id}

class AssessItem {
  code : string = '' //, optional),
  createDate : Timestamp = new Timestamp //, optional),
  id : string = '' //, optional),
  name : string = '' //, optional),
  status : string = '' //, optional),
  templateItemList : TemplateItem[] = [] //[TemplateItem], optional),
  type : string = '' //, optional),
  updateDate : Timestamp = new Timestamp //, optional)
}
class Timestamp {
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
class TemplateItem {
  code : string = '' //, optional),
  createDate : Timestamp = new Timestamp //, optional),
  id : string = '' //, optional),
  name : string = '' //, optional),
  status : string = '' //, optional),
  templateItemItemList : TemplateItemItem[] = [] //[TemplateItemItem], optional),
  type : string = '' //, optional),
  updateDate : Timestamp = new Timestamp //, optional)
}
class TemplateItemItem {
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
}

class AssessMenuItem {
  assessCode: string //, optional),
  assessId: string //, optional),
  assessName: string //, optional),
  seqNo: number //, optional)
}

class AssessPaperItem {
  code: string //, optional),
  createDate: Timestamp //, optional),
  creatorId: string //, optional),
  id: string //, optional),
  name: string //, optional),
  orgId: string //, optional),
  status: string //, optional)
}

interface AssessPaperExamineeMapItem {
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


export {
  AssessItem,
  Timestamp,
  TemplateItem,
  TemplateItemItem,
  AssessMenuItem,
  AssessPaperItem,
  AssessPaperExamineeMapItem
}