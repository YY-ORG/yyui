import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Adminui, SystemDictionaryService, RestApiCfg, RestApi, Common } from '../../../core';

@Injectable()
export class PasswordService {
    constructor(private http:Http,
                private restApiCfg:RestApiCfg,
                private dict:SystemDictionaryService,
                private restApi:RestApi) {
    }
    
    userInfo = this.restApi.getLoginInfo().userInfo;
    
    
    putEditAccount ( data: Adminui.PasswordProfile) {

        const api = this.restApiCfg.getRestApi("password.modify");
        
        return this.restApi.request(api.method, api.url, null, null, data)
    }
}
  