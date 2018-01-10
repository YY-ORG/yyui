import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { SystemDictionaryService, RestApiCfg, RestApi, Adminui, Assess, Common } from '../../../core';

@Injectable()
export class FristCommentService {
  constructor(private http:Http,
              private restApiCfg:RestApiCfg,
              private dict:SystemDictionaryService,
              private restApi:RestApi) {
  }

  userInfo = this.restApi.getLoginInfo().userInfo;

  fetchUnmarklist (page: number, size: number): Promise<[Common.PageInfo, Assess.AssessPaperExamineeMapItem[]]> {
    const api = this.restApiCfg.getRestApi("get.unmarklist");
    
    return this.restApi.request(api.method, api.url, null, [{
      key: 'size',
      value: size
    }, {
      key: 'page',
      value: page
    }]).then((res: any) => {
        return [res.pageInfo, res.resultContent]
    }) as Promise<[Common.PageInfo, Assess.AssessPaperExamineeMapItem[]]>
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