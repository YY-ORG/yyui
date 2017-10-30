import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Adminui, SystemDictionaryService, RestApiCfg, RestApi } from '../../../core';

@Injectable()
export class AccountService {
    constructor(private http:Http,
                private restApiCfg:RestApiCfg,
                private dict:SystemDictionaryService,
                private restApi:RestApi) {
    }
    
    userInfo = this.restApi.getLoginInfo().userInfo;

    fetchIdAccountList (organization_id: string, page: number, size: number) : Promise<Adminui.UserItem[]>{
        const api = this.restApiCfg.getRestApi("users.organization");

        return this.restApi.request(api.method, api.url, { organization_id, page, size })
    }

    fetchAccountList (page: number, size: number) : Promise<Adminui.UserItem[]> {

      const api = this.restApiCfg.getRestApi("users.all");
      
      return this.restApi.request(api.method, api.url, { page, size })
    }

}