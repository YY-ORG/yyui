import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { SystemDictionaryService, RestApiCfg, RestApi, Adminui, Assess, Common } from '../../../core';

@Injectable()
export class AssessCategoryService {
  constructor(private http:Http,
              private restApiCfg:RestApiCfg,
              private dict:SystemDictionaryService,
              private restApi:RestApi) {
  }

  userInfo = this.restApi.getLoginInfo().userInfo;

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


  creatNewCategory (data: Assess.AssessCategoryReq): Promise<Assess.AssessCategoryItem>{
    const api = this.restApiCfg.getRestApi("creat.category");
    
    return this.restApi.request(api.method, api.url, null, null, data)
  }
  
  updateNewCategory (data: Assess.AssessCategoryWithIDReq): Promise<Assess.AssessCategoryItem>{
    const api = this.restApiCfg.getRestApi("update.category");
    
    return this.restApi.request(api.method, api.url, null, null, data)
  }

  deleteCategory (id: string){
    const api = this.restApiCfg.getRestApi("delete.category");
    
    return this.restApi.request(api.method, api.url, { id })
  }
  
  // {
  //     "desc": "为考卷增加考题分组",
  //     "method": "POST",
  //     "id": "assesspaper.add.category",
  //     "url": "assess/authsec/assesspaper/{id}/category"
  // },
  // {
  //     "desc": "获取某个考卷的考题分组",
  //     "method": "GET",
  //     "id": "assesspaper.category",
  //     "url": "assess/authsec/assesspaper/{id}/category/categorylist"
  // }
  
}