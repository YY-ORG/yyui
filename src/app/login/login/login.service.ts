import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { UserProfile, RoleProfile, OrganizationItem, SystemDictionaryService, RestApiCfg, RestApi, UserDetailsItem } from '../../../core';

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

    getUserInfo(): Promise<UserDetailsItem> {
		const api = this.restApiCfg.getRestApi("user.currentuser");

        return this.restApi.request(api.method, api.url).then((res: UserDetailsItem) => {
            this.restApi.setUserInfo(res)
            return res
        })
    }

    setJwt( jwt: string ) {
		this.restApi.setJwt("bearer " + jwt)
    }

}