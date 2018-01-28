import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { SystemDictionaryService, RestApiCfg, RestApi, Adminui, Assess, Common } from '../../../core';

@Injectable()
export class ExaminationAssessService {
  constructor(private http:Http,
              private restApiCfg:RestApiCfg,
              public dict:SystemDictionaryService,
              private restApi:RestApi) {
  }

  userInfo = this.restApi.getLoginInfo().userInfo;


  // 获取某个用户某个题的答案
  fetchAssessanswer (assessPaperId: string, assessId: string): Promise<Assess.SimpleAssessAnswerItem[]>{
    const api = this.restApiCfg.getRestApi("get.assessanswer");
    
    return this.restApi.request(api.method, api.url, { assessPaperId, assessId })
  }

  fetchMarkassessanswer (id: string, assessId: string, userId: string): Promise<Assess.MarkedAssessAnswer> {
    const api = this.restApiCfg.getRestApi("get.markassessanswer");
    
    return this.restApi.request(api.method, api.url, { id, assessId }, [{
      key: '_userId',
      value: userId
    }])
  }
  
  // 考生提交某个卷子某个题(单答案题)的答案
  postSingleAssessanswer (assessPaperId: string, assessId: string, groupId: string, data: Assess.AssessTemplateReq[] = []): Promise<any>{
    const api = this.restApiCfg.getRestApi("assess.single.assessanswer");
    
    return this.restApi.request(api.method, api.url, { assessPaperId, groupId, assessId }, null, data)
  }

  // 考生提交某个多答案题（提交的时候无须再提交内容）
  putAssessanswer (assessPaperId: string, assessId: string, groupId: string): Promise<any>{
    const api = this.restApiCfg.getRestApi("put.single.assessanswer");
    
    return this.restApi.request(api.method, api.url, { assessPaperId, groupId, assessId })
  }

  // 考生增加某个卷子某个多答案题的答案
  postAssessanswer (assessPaperId: string, assessId: string, groupId: string, data: Assess.AssessTemplateReq[] = []): Promise<any>{
    const api = this.restApiCfg.getRestApi("assessanswer.answeritem");
    
    return this.restApi.request(api.method, api.url, { assessPaperId, groupId, assessId }, null, data)
  }

  // 考生增加某个卷子某个题的元素项答案
  postAssessanswerSubanswer (assessPaperId: string, assessId: string, groupId: string, data: Assess.AssessTemplateReq[] = []): Promise<any>{
    console.log(this)
    const api = this.restApiCfg.getRestApi("assessanswer.subanswer");
    
    return this.restApi.request(api.method, api.url, { assessPaperId, groupId, assessId }, null, data)
  }

  // 考生增加某个卷子某个多答案题的答案
  updateAssessanswer (assessPaperId: string, assessId: string, groupId: string, answerItemId: string, data: Assess.AssessTemplateReq[] = []): Promise<any>{
    const api = this.restApiCfg.getRestApi("update.assessanswer.answer");
    
    return this.restApi.request(api.method, api.url, { assessPaperId, groupId, assessId, answerItemId }, null, data)
  }

  // 考生增加某个卷子某个题的元素项答案
  updateAssessanswerSubanswer (assessPaperId: string, assessId: string, groupId: string, answerItemId: string, data: Assess.AssessTemplateReq[] = []): Promise<any>{
    const api = this.restApiCfg.getRestApi("update.assessanswer.subanswer");
    
    return this.restApi.request(api.method, api.url, { assessPaperId, groupId, assessId, answerItemId }, null, data)
  }

  // 考生删除某个卷子某个多答案题的多个答案 表格
  deleteTableAssessanswers (assessPaperId: string, assessId: string, groupId: string, data: string[] = []): Promise<any>{
    const api = this.restApiCfg.getRestApi("delete.assessanswers");
    
    return this.restApi.request(api.method, api.url, { assessPaperId }, null, data)
  }

  // 考生删除某个卷子某个题的子元素项的多个答案 表单里表格
  deleteFormTableAssessanswers (assessPaperId: string, assessId: string, groupId: string, data: string[] = []): Promise<any>{
    const api = this.restApiCfg.getRestApi("delete.subanswer");
    
    return this.restApi.request(api.method, api.url, { assessPaperId }, null, data)
  }

  // 删除文件
  deleteFile (id: string) {
    const api = this.restApiCfg.getRestApi("delete.file");
    
    return this.restApi.request(api.method, api.url, { id })
  }


  type = this.dict.get({ 
    owner : "ASSESS",
    field : "TYPE"
  })

  status = this.dict.get({ 
      owner : "GLOBAL",
      field : "STATUS"
  })
}