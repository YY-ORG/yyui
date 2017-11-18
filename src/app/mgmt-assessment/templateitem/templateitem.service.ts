import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { SystemDictionaryService, RestApiCfg, RestApi, Adminui, Assess, Common } from '../../../core';

@Injectable()
export class TemplateitemService {
  constructor(private http:Http,
              private restApiCfg:RestApiCfg,
              private dict:SystemDictionaryService,
              private restApi:RestApi) {
  }

  userInfo = this.restApi.getLoginInfo().userInfo;

  fetchTemplateitemlist (page: number, size: number): Promise<[Common.PageInfo, Assess.SimpleTemplateItem[]]> {
    const api = this.restApiCfg.getRestApi("templateitem.templateitemlist");
    
    return this.restApi.request(api.method, api.url, null, [{
      key: 'size',
      value: size
    }, {
      key: 'page',
      value: page
    }]).then((res: any) => {
        return [res.pageInfo, res.resultContent]
    }) as Promise<[Common.PageInfo, Assess.SimpleTemplateItem[]]>
  }


  creatNewTemplateitem (data: Assess.TemplateItemProfileReq): Promise<Assess.SimpleTemplateItem>{
    const api = this.restApiCfg.getRestApi("template.templateitem");
    
    return this.restApi.request(api.method, api.url, null, null, data)
  }
  
  updateNewTemplateitem (data: Assess.TemplateItemWithIDProfileReq): Promise<Assess.SimpleTemplateItem>{
    const api = this.restApiCfg.getRestApi("update.templateitem");
    
    return this.restApi.request(api.method, api.url, null, null, data)
  }

  deleteTemplateitem (id: string){
    const api = this.restApiCfg.getRestApi("delete.templateitem");
    
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
  
  type = this.dict.get({ 
    owner : "TEMPLATE_ITEM",
    field : "TYPE"
  })
}