import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { SystemDictionaryService, RestApiCfg, RestApi, Adminui, Assess, Common } from '../../../core';

@Injectable()
export class AssessTemplateitemService {
  constructor(private http:Http,
              private restApiCfg:RestApiCfg,
              private dict:SystemDictionaryService,
              private restApi:RestApi) {
  }

  userInfo = this.restApi.getLoginInfo().userInfo;

  fetchOwner() : Promise<string[]>{
    const api = this.restApiCfg.getRestApi("sysdic.owner");

    return this.restApi.request(api.method, api.url)
  }
  
  fetchField(owner: string) : Promise<string[]>{
    const api = this.restApiCfg.getRestApi("sysdic.owner.field");

    return this.restApi.request(api.method, api.url, {owner})
  }

  fetchTemplates(type: number) : Promise<Assess.SimpleTemplate[]>{
    const api = this.restApiCfg.getRestApi("all.templates");

    return this.restApi.request(api.method, api.url, null, [{
      key: '_type',
      value: type
    }])
  }

  type = this.dict.get({ 
    owner : "TEMPLATE_ITEM",
    field : "TYPE"
  })
}