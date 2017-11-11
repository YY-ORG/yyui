import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { SystemDictionaryService, RestApiCfg, RestApi, Adminui, Assess, Common } from '../../../core';

@Injectable()
export class ExaminationTemplateService {
  constructor(private http:Http,
              private restApiCfg:RestApiCfg,
              private dict:SystemDictionaryService,
              private restApi:RestApi) {
  }

  userInfo = this.restApi.getLoginInfo().userInfo;

  fetchTemplatelist (page: number, size: number): Promise<[Common.PageInfo, Assess.SimpleTemplate[]]> {
    const api = this.restApiCfg.getRestApi("assess.templatelist");
    
    return this.restApi.request(api.method, api.url, null, [{
      key: 'size',
      value: size
    }, {
      key: 'page',
      value: page
    }]).then((res: any) => {
        return [res.pageInfo, res.resultContent]
    }) as Promise<[Common.PageInfo, Assess.SimpleTemplate[]]>
  }
  
  postTemplate (data: Assess.TemplateProfileReq){
    const api = this.restApiCfg.getRestApi("assess.template");
    
    return this.restApi.request(api.method, api.url, null, null, data)
  }

  editTemplate (data: Assess.TemplateWithIDProfileReq){
    const api = this.restApiCfg.getRestApi("update.template");
    
    return this.restApi.request(api.method, api.url, null, null, data)
  }

  fetchTemplateitem (id: string): Promise<Assess.SimpleTemplateItem[]> {
    const api = this.restApiCfg.getRestApi("templateitem.id.templateitemlist");
    
    return this.restApi.request(api.method, api.url, { id })
  }

  deleteTemplate (id: string) {
    const api = this.restApiCfg.getRestApi("delete.template");
    
    return this.restApi.request(api.method, api.url, { id })
  }

  type = this.dict.get({ 
    owner : "TEMPLATE",
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