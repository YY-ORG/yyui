import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { SystemDictionaryService, RestApiCfg, RestApi, AssessItem, AssessPaperItem, AssessMenuItem } from '../../../core';

@Injectable()
export class ExaminationPaperService {
  constructor(private http:Http,
              private restApiCfg:RestApiCfg,
              private dict:SystemDictionaryService,
              private restApi:RestApi) {
  }
  
  fetchExamination (id: string): Promise<AssessItem> {
    const api = this.restApiCfg.getRestApi("authsec.assess");
    
    return this.restApi.request(api.method, api.url, { id })
  }

  fetchAssesspaperlist (): Promise<AssessPaperItem[]> {
    const api = this.restApiCfg.getRestApi("assesspaperlist.orgnization");
    
    return this.restApi.request(api.method, api.url)
  }
  
  fetchAssesslist (id: string): Promise<AssessMenuItem[]> {
    const api = this.restApiCfg.getRestApi("assesspaper.assesslist");
    
    return this.restApi.request(api.method, api.url, { id })
  }

  fetchoOrgAssesslist (): Promise<AssessPaperItem[]> {
    const api = this.restApiCfg.getRestApi("assesslist.orgnization");
    
    return this.restApi.request(api.method, api.url)
  }
}