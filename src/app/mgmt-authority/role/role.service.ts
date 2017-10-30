import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Adminui, SystemDictionaryService, RestApiCfg, RestApi } from '../../../core';

@Injectable()
export class RoleService {
    constructor(private http:Http,
                private restApiCfg:RestApiCfg,
                private dict:SystemDictionaryService,
                private restApi:RestApi) {
    }
    
    userInfo = this.restApi.getLoginInfo().userInfo;

    fetchRoleList (page: number, size: number) : Promise<Adminui.RoleItem[]> {

      const api = this.restApiCfg.getRestApi("roles");
      
      return this.restApi.request(api.method, api.url, { page, size })
    }
    
    fetchMenuTree (): Promise<Adminui.MenuItem[]> {
      const api = this.restApiCfg.getRestApi("mpp.menu.tree");
      
      return this.restApi.request(api.method, api.url)
    }

    fetchUserMenuTree (role_id: string): Promise<Adminui.RoleDetailsItem> {
      const api = this.restApiCfg.getRestApi("user.mpp.menu.tree");
      
      return this.restApi.request(api.method, api.url, { role_id })
    }

    postUserMenuTree (data: Adminui.RoleDetailsItem) {
      const api = this.restApiCfg.getRestApi("role.tree");
      
      return this.restApi.request(api.method, api.url, null, null, data)
    }

}