import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { SystemDictionaryService, RestApiCfg, RestApi, Adminui, Assess, Common } from '../../../core';

@Injectable()
export class SetScoringService {
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