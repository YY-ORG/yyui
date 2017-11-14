import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Adminui, SystemDictionaryService, RestApiCfg, RestApi, Common } from '../../../core';

@Injectable()
export class PersonalDataService {
    constructor(private http:Http,
                private restApiCfg:RestApiCfg,
                private dict:SystemDictionaryService,
                private restApi:RestApi) {
    }
    
    userInfo = this.restApi.getLoginInfo().userInfo;


    putEditAccount (user_id: string, data: Adminui.UserDetailsItem) {

        const api = this.restApiCfg.getRestApi("edit.account");
        
        return this.restApi.request(api.method, api.url, { user_id }, null, data)
    }
    
}