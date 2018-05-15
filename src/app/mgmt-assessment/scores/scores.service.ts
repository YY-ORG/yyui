import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { SystemDictionaryService, RestApiCfg, RestApi, Adminui, Assess, Common } from '../../../core';

@Injectable()
export class ScoresService {
  constructor(private http:Http,
              private restApiCfg:RestApiCfg,
              private dict:SystemDictionaryService,
              private restApi:RestApi) {
  }

  userInfo = this.restApi.getLoginInfo().userInfo;

  fetAssesspaperlist (page: number = 0, size: number = 10000): Promise<[Common.PageInfo, Assess.SimpleAssessPaperItem[]]> {
    const api = this.restApiCfg.getRestApi("assesspaper.assesspaperlist");
    
    return this.restApi.request(api.method, api.url, null, [{
      key: 'page',
      value: page
    }, {
      key: 'size',
      value: size
    }]).then((res: any) => {
      return [res.pageInfo, res.resultContent]
    }) as Promise<[Common.PageInfo, Assess.SimpleAssessPaperItem[]]>
  }

  fetAssesspaperRanking (assessPaperId: string, orgId: string, title: string, page: number, size: number): Promise<[Common.PageInfo, any[]]> {
    const api = this.restApiCfg.getRestApi("get.assesspaper.ranking");
    
    return this.restApi.request(api.method, api.url, { assessPaperId }, [{
      key: '_title',
      value: title 
    }, {
      key: '_orgId',
      value: orgId 
    }, {
      key: 'page',
      value: page
    }, {
      key: 'size',
      value: size
    }]).then((res: any) => {
      return [res.pageInfo, res.resultContent]
    }) as Promise<[Common.PageInfo, any[]]>
  }

  fetchRankingDetail (assessPaperId: string, userId: string): Promise<any> {
    const api = this.restApiCfg.getRestApi("get.answerscorelist");
    
    return this.restApi.request(api.method, api.url, { assessPaperId }, [{
      key: '_userId',
      value: userId
    }])
  }
    
  fetchOrganizations() : Promise<Adminui.OrganizationItem[]>{
      const api = this.restApiCfg.getRestApi("user.organizations");

      return this.restApi.request(api.method, api.url)
  }

  fetchRanking (paperId: string, orgId: string, title: string, page: number, size: number): Promise<[Common.PageInfo, any[]]> {
    const api = this.restApiCfg.getRestApi("get.assesspaper.ranking");
    
    return this.restApi.request(api.method, api.url, { assessPaperId: paperId }, [{
      key: '_orgId',
      value: orgId
    },{
      key: '_title',
      value: title
    },{
      key: 'page',
      value: page
    }, {
      key: 'size',
      value: size
    }]).then((res: any) => {
      return [res.pageInfo, res.resultContent]
    }) as Promise<[Common.PageInfo, any[]]>
  }

  professionalTitle = this.dict.get({ 
    owner : "USER_INFO",
    field : "PROFESSIONAL_TITLE"
  })

  status = this.dict.get({ 
    owner : "ASSESS_PAPER_EXAMINEE_MAP",
    field : "STATUS"
  })
}