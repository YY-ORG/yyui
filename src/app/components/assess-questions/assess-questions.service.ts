import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { SystemDictionaryService, RestApiCfg, RestApi, Adminui, Assess, Common } from '../../../core';

@Injectable()
export class AssessQuestionsService {
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

  type = this.dict.get({ 
    owner : "ASSESS",
    field : "TYPE"
  })

  status = this.dict.get({ 
      owner : "GLOBAL",
      field : "STATUS"
  })
}