import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { UserProfile, RoleProfile, OrganizationItem, SystemDictionaryService, RestApiCfg, RestApi } from '../../../core';

@Injectable()
export class LoginService {
    constructor(private http:Http,
                private restApiCfg:RestApiCfg,
                private dict:SystemDictionaryService,
                private restApi:RestApi) {
    }
    
    submitLogin(username, password) : Promise<string>{
        const api = this.restApiCfg.getRestApi("uaa.login");

        return this.restApi.request(api.method, api.url, { username, password }, undefined, undefined, "Basic")
    }

}