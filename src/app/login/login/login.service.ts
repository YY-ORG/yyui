import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Adminui, Assess, SystemDictionaryService, RestApiCfg, RestApi } from '../../../core';

@Injectable()
export class LoginService {
    constructor(private http:Http,
                private restApiCfg:RestApiCfg,
                private dict:SystemDictionaryService,
                private restApi:RestApi) {
    }
    
    submitLogin(username, password) : Promise<any>{
        const api = this.restApiCfg.getRestApi("uaa.login");

        return this.restApi.request(api.method, api.url, { username, password }, undefined, undefined, "Basic " + btoa("ui:secret"))
    }

    getUserInfo(): Promise<Adminui.UserDetailsItem> {
		const api = this.restApiCfg.getRestApi("user.currentuser");

        return this.restApi.request(api.method, api.url).then((res: Adminui.UserDetailsItem) => {
            this.restApi.setUserInfo(res)
            return res
        })
    }

    setJwt( jwt: string ) {
		this.restApi.setJwt("bearer " + jwt)
    }

}