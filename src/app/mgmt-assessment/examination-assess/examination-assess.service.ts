import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { SystemDictionaryService, RestApiCfg, RestApi, Adminui, Assess, Common } from '../../../core';

@Injectable()
export class ExaminationAssessService {
  constructor(private http:Http,
              private restApiCfg:RestApiCfg,
              private dict:SystemDictionaryService,
              private restApi:RestApi) {
  }

  userInfo = this.restApi.getLoginInfo().userInfo;

  fetAssesslist (page: number, size: number): Promise<[Common.PageInfo, Assess.SimpleAssessItem[]]> {
    const api = this.restApiCfg.getRestApi("assesses.assesslist");
    
    return this.restApi.request(api.method, api.url, null, [{
      key: 'page',
      value: page
    }, {
      key: 'size',
      value: size
    }]).then((res: any) => {
      return [res.pageInfo, res.resultContent]
    }) as Promise<[Common.PageInfo, Assess.SimpleAssessItem[]]>
  }

  postQuestions (data: Assess.AssessProfileReq){
    const api = this.restApiCfg.getRestApi("creat.assess");
    
    return this.restApi.request(api.method, api.url, null, null, data)
  }

  updateQuestions (data: Assess.AssessWithIDProfileReq){
    const api = this.restApiCfg.getRestApi("update.assess");
    
    return this.restApi.request(api.method, api.url, null, null, data)
  }
  
  deleteQuestions (id: string) {
    const api = this.restApiCfg.getRestApi("delete.assess");
    
    return this.restApi.request(api.method, api.url, { id })
  }

  getAssessTemplate (id: string): Promise<Assess.SimpleTemplate[]> {
    const api = this.restApiCfg.getRestApi("get.assess.template");
    
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