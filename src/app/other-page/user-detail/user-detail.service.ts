import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Adminui, SystemDictionaryService, RestApiCfg, RestApi, Common } from '../../../core';

@Injectable()
export class UserdetailService {
    constructor(private http:Http,
                private restApiCfg:RestApiCfg,
                private dict:SystemDictionaryService,
                private restApi:RestApi) {
    }
    
    userInfo = this.restApi.getLoginInfo().userInfo;

}