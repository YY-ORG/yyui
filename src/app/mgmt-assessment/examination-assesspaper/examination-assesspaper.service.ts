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

  updateNewPaper (data: Assess.AssessPaperWithIDProfileReq){
    const api = this.restApiCfg.getRestApi("update.paper");
    
    return this.restApi.request(api.method, api.url, null, null, data)
  }

  deletePaper (id: string) {
    const api = this.restApiCfg.getRestApi("delete.assesspaper");
    
    return this.restApi.request(api.method, api.url, { id })
  }
  
  getPaperAssessList (id: string): Promise<Assess.AssessMenuItem[]> {
    const api = this.restApiCfg.getRestApi("assesspaper.assesslist");
    
    return this.restApi.request(api.method, api.url, { id })
  }
  
  assignCategory (id: string, data: string[]): Promise<any> {
    const api = this.restApiCfg.getRestApi("assesspaper.add.category");
    
    return this.restApi.request(api.method, api.url, {id}, null, data)
  }

  getCategory (id: string): Promise<Assess.SimpleAssessCategoryItem[]> {
    const api = this.restApiCfg.getRestApi("assesspaper.category");
    
    return this.restApi.request(api.method, api.url, { id })
  }
  
  fetchCategorylist (page: number, size: number): Promise<[Common.PageInfo, Assess.SimpleAssessCategoryItem[]]> {
    const api = this.restApiCfg.getRestApi("get.category");
    
    return this.restApi.request(api.method, api.url, null, [{
      key: 'size',
      value: size
    }, {
      key: 'page',
      value: page
    }]).then((res: any) => {
        return [res.pageInfo, res.resultContent]
    }) as Promise<[Common.PageInfo, Assess.SimpleAssessCategoryItem[]]>
  }

  //职称
  professionalTitle = this.dict.get({ 
    owner : "USER_INFO",
    field : "PROFESSIONAL_TITLE"
  })

  type = this.dict.get({ 
    owner : "ASSESS",
    field : "TYPE"
  })
  itemType = this.dict.get({ 
    owner : "TEMPLATE_ITEM",
    field : "TYPE"
  })
  status = this.dict.get({ 
      owner : "GLOBAL",
      field : "STATUS"
  })
}