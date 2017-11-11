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
  
  fetchExamination (id: string): Promise<Assess.AssessItem> {
    const api = this.restApiCfg.getRestApi("authsec.assess");
    
    return this.restApi.request(api.method, api.url, { id })
  }

  fetchAssesspaperlist (): Promise<Assess.AssessPaperItem[]> {
    const api = this.restApiCfg.getRestApi("assesspaperlist.orgnization");
    
    return this.restApi.request(api.method, api.url)
  }
  
  fetchAssesslist (id: string): Promise<Assess.AssessMenuItem[]> {
    const api = this.restApiCfg.getRestApi("assesspaper.assesslist");
    
    return this.restApi.request(api.method, api.url, { id })
  }

  fetchoOrgAssesslist (): Promise<Assess.AssessPaperItem[]> {
    const api = this.restApiCfg.getRestApi("assesslist.orgnization");
    
    return this.restApi.request(api.method, api.url)
  }

  postAssess (assessPaperId:string, assessId: string, data: any[] = []){
    const api = this.restApiCfg.getRestApi("assess.assessanswer");
    
    return this.restApi.request(api.method, api.url, { assessPaperId, assessId }, null, data)
  }

  type = this.dict.get({ 
      owner : "ASSESS",
      field : "TYPE"
  })
}