import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { SystemDictionaryService, RestApiCfg, RestApi, Adminui, Assess, Common } from '../../../core';

@Injectable()
export class ExaminationAssesspaperService {
  constructor(private http:Http,
              private restApiCfg:RestApiCfg,
              private dict:SystemDictionaryService,
              private restApi:RestApi) {
  }

  userInfo = this.restApi.getLoginInfo().userInfo;
  
  fetAssesspaperlist (page: number, size: number): Promise<[Common.PageInfo, Assess.SimpleAssessPaperItem[]]> {
    const api = this.restApiCfg.getRestApi("assesspaper.assesspaperlist");
    
    return this.restApi.request(api.method, api.url, null, [{
      key: 'page',
      value: page
    }, {
      key: 'size',
      value: size
    }]).then((res: any) => {
      return [res.pageInfo, res.resultContent]
    }) as Promise<[Common.PageInfo, Assess.SimpleAssessPaperItem[]]>
  }

  creatNewPaper (data: Assess.AssessPaperProfileReq){
    const api = this.restApiCfg.getRestApi("creat.paper");
    
    return this.restApi.request(api.method, api.url, null, null, data)
  }

  updateNewPaper (data: Assess.AssessPaperProfileReq){
    const api = this.restApiCfg.getRestApi("update.paper");
    
    return this.restApi.request(api.method, api.url, null, null, data)
  }
  
}