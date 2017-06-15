import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { UserProfile, RoleProfile, OrganizationItem, SystemDictionaryService, RestApiCfg, RestApi } from '../../../core';

@Injectable()
export class RegisterService {
    constructor(private http:Http,
                private restApiCfg:RestApiCfg,
                private dict:SystemDictionaryService,
                private restApi:RestApi) {
    }
    
    submitRegister(postData: UserProfile) : Promise<string>{
        const api = this.restApiCfg.getRestApi("creat.user.account");

        return this.restApi.request(api.method, api.url, undefined, undefined, postData)
    }
    
    fetchOrganizations() : Promise<OrganizationItem[]>{
        const api = this.restApiCfg.getRestApi("user.organizations");

        return this.restApi.request(api.method, api.url)
    }


    //岗位系列
    occupationType = this.dict.get({ 
        owner : "USER_INFO",
        field : "OCCUPATION_TYPE"
    })

    //职称
    professionalTitle = this.dict.get({ 
        owner : "USER_INFO",
        field : "PROFESSIONAL_TITLE"
    })

    //行政级别
    administrativeRank = this.dict.get({ 
        owner : "USER_INFO",
        field : "ADMINISTRATIVE_RANK"
    })

    //行政职务
    administrativePost = this.dict.get({ 
        owner : "USER_INFO",
        field : "ADMINISTRATIVE_POST"
    })

    //性别
    gender = this.dict.get({ 
        owner : "GLOBAL",
        field : "GENDER"
    })

}