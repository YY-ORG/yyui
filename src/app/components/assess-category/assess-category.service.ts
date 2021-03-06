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


  type = this.dict.get({ 
    owner : "ASSESS",
    field : "TYPE"
  })

  status = this.dict.get({ 
      owner : "GLOBAL",
      field : "STATUS"
  })
}