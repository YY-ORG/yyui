import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { SystemDictionaryService, RestApiCfg, RestApi, Adminui, Assess, Common } from '../../../core';

@Injectable()
export class TimeService {
  constructor(private http:Http,
              private restApiCfg:RestApiCfg,
              private dict:SystemDictionaryService,
              private restApi:RestApi) {
  }

  userInfo = this.restApi.getLoginInfo().userInfo;

  fetAssesspaperTimelist (page: number = 0, size: number = 10000): Promise<[Common.PageInfo, any[]]> {
    const api = this.restApiCfg.getRestApi("get.assesspaper.time");
    
    return this.restApi.request(api.method, api.url, null, [{
      key: 'page',
      value: page
    }, {
      key: 'size',
      value: size
    }]).then((res: any) => {
      return [res.pageInfo, res.resultContent]
    }) as Promise<[Common.PageInfo, any[]]>
  }

  setAssesspaperTimelist (data: any[] = []): Promise<any>{
    const api = this.restApiCfg.getRestApi("set.assesspaper.time");
    
    return this.restApi.request(api.method, api.url, null, null, data)
  }

  professionalTitle = this.dict.get({ 
    owner : "USER_INFO",
    field : "PROFESSIONAL_TITLE"
  })

  status = this.dict.get({ 
    owner : "ASSESS_PAPER_EXAMINEE_MAP",
    field : "STATUS"
  })
}