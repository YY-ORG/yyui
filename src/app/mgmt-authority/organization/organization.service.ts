import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Adminui, SystemDictionaryService, RestApiCfg, RestApi, Common } from '../../../core';

@Injectable()
export class OrganizationService {
    constructor(private http:Http,
                private restApiCfg:RestApiCfg,
                private dict:SystemDictionaryService,
                private restApi:RestApi) {
    }
    
    userInfo = this.restApi.getLoginInfo().userInfo;



    addOrganization (data: Adminui.OrganizationProfile) {

        const api = this.restApiCfg.getRestApi("add.organization");
        
        return this.restApi.request(api.method, api.url, null, null, data)
    }

    updateOrganization (organization_id: string) : Promise<string>{
        const api = this.restApiCfg.getRestApi("update.organization");

        return this.restApi.request(api.method, api.url, { organization_id })
    }

    
    fetchAllUsers (organization_id: string, page: number, size: number): Promise<[Common.PageInfo, Adminui.UserDetailsItem[]]> { 
        const api = this.restApiCfg.getRestApi("organization.users.all");

        let pro = this.restApi.request(api.method, api.url, {organization_id, page, size})

        return pro.then((res: any) => {
            return [res.pageInfo, res.resultContent]
        }) as Promise<[Common.PageInfo, Adminui.UserDetailsItem[]]>
    }


    putEditOrganization (organization_id: string, data: Adminui.OrganizationProfile) {

      const api = this.restApiCfg.getRestApi("modify.organization");
      
      return this.restApi.request(api.method, api.url, { organization_id }, null, data)
    }
    
    fetchAllOrganizations (page: number, size: number): Promise<[Common.PageInfo, Adminui.OrganizationItem[]]> { 
        const api = this.restApiCfg.getRestApi("get.organization");

        let pro = this.restApi.request(api.method, api.url, null, [{
            key: 'page',
            value: page
        }, {
            key: 'size',
            value: size
        }])

        return pro.then((res: any) => {
            return [res.pageInfo, res.resultContent]
        }) as Promise<[Common.PageInfo, Adminui.OrganizationItem[]]>
    }
    
    queryOrganization (page: number, size: number, name?: string): Promise<[Common.PageInfo, Adminui.OrganizationItem[]]> { 
        const api = this.restApiCfg.getRestApi("query.organization");

        let pro = this.restApi.request(api.method, api.url, null, [{
            key: 'page',
            value: page
        }, {
            key: 'size',
            value: size
        }, ...(name ? [{
            key: 'name',
            value: name
        }] : [])])

        return pro.then((res: any) => {
            return [res.pageInfo, res.resultContent]
        }) as Promise<[Common.PageInfo, Adminui.OrganizationItem[]]>
    }

    deleteOrganization (organization_id: string): Promise<string> {
        const api = this.restApiCfg.getRestApi('delete.organization')
        return this.restApi.request(api.method, api.url, {organization_id})
    }
    
    //部门所属系列
    serrial = this.dict.get({ 
        owner : "GLOBAL",
        field : "SERRIAL"
    })

}