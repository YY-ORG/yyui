import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { SystemDictionaryService, RestApiCfg, RestApi, Adminui, Assess, Common } from '../../../core';

@Injectable()
export class FirstCommentPaperService {
  constructor(private http:Http,
              private restApiCfg:RestApiCfg,
              private dict:SystemDictionaryService,
              private restApi:RestApi) {
  }

  userInfo = this.restApi.getLoginInfo().userInfo;

  fetchAssessanswerlist (id: string, userId: string): Promise<Assess.SimpleAssessPaperAnswerItem> {
    const api = this.restApiCfg.getRestApi("get.assessanswerlist");
    
    return this.restApi.request(api.method, api.url, { id }, [{
      key: '_userId',
      value: userId
    }])
  }

  fetchMarkassessanswer (id: string, assessId: string, userId: string): Promise<Assess.MarkedAssessAnswer> {
    const api = this.restApiCfg.getRestApi("get.markassessanswer");
    
    return this.restApi.request(api.method, api.url, { id, assessId }, [{
      key: '_userId',
      value: userId
    }])
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