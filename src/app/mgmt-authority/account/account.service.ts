import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Adminui, SystemDictionaryService, RestApiCfg, RestApi, Common } from '../../../core';

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

    putEditAccount (user_id: string, data: Adminui.UserProfile) {

      const api = this.restApiCfg.getRestApi("edit.account");
      
      return this.restApi.request(api.method, api.url, { user_id }, null, data)
    }
    
    queryAccountList (userName: string, page: number, size: number): Promise<[Common.PageInfo, Adminui.UserProfile[]]> {
        const api = this.restApiCfg.getRestApi("query.users.all");

        let pro = userName ? this.restApi.request(api.method, api.url, { page, size }, [{key: 'userName', value: userName}])
            : this.restApi.request(api.method, api.url, { page, size })

        return pro.then((res: any) => {
            return [res.pageInfo, res.resultContent]
        }) as Promise<[Common.PageInfo, Adminui.UserProfile[]]>
    }

    fetchAllRoles (): Promise<Adminui.RoleItem[]> { 
        const api = this.restApiCfg.getRestApi("user.all.roles");

        let pro = this.restApi.request(api.method, api.url )

        return pro.then((res: any) => {
            return res.resultContent
        })
    }

}