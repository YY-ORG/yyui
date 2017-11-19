import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { SystemDictionaryService, RestApiCfg, RestApi, Adminui, Assess } from '../../../core';

@Injectable()
export class ExaminationPaperService {
  constructor(private http:Http,
              private restApiCfg:RestApiCfg,
              public dict:SystemDictionaryService,
              private restApi:RestApi) {
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

  postfile () {
    const api = this.restApiCfg.getRestApi("upload.file");
    
    return this.restApi.request(api.method, api.url)
  }
}