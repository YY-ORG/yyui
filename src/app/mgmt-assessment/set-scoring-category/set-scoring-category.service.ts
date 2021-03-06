import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { SystemDictionaryService, RestApiCfg, RestApi, Adminui, Assess, Common } from '../../../core';

@Injectable()
export class SetScoringCategoryService {
  constructor(private http:Http,
              private restApiCfg:RestApiCfg,
              private dict:SystemDictionaryService,
              private restApi:RestApi) {
  }

  userInfo = this.restApi.getLoginInfo().userInfo;
  
  fetPaperScoring (id: string): Promise<Assess.ApAcScoringItem[]> {
    const api = this.restApiCfg.getRestApi("get.paper.scoring");
    
    return this.restApi.request(api.method, api.url,  { id })
  }

  postPaperScoring (id: string, data: Assess.ApAcScoringReq[]){
    const api = this.restApiCfg.getRestApi("post.paper.scoring");
    
    return this.restApi.request(api.method, api.url, { id }, null, data)
  }
  
  fetCategoryScoring (id: string, categoryId: string, page: number, size: number): Promise<[Common.PageInfo, Assess.ApAssessScoringItem[]]> {
    const api = this.restApiCfg.getRestApi("get.category.scoring");
    
    return this.restApi.request(api.method, api.url, { id, categoryId }, [{
      key: 'page',
      value: page
    }, {
      key: 'size',
      value: size
    }]).then((res: any) => {
      return [res.pageInfo, res.resultContent]
    }) as Promise<[Common.PageInfo, Assess.ApAssessScoringItem[]]>
  }

  postCategoryScoring (id: string, categoryId: string, data: Assess.ApAssessScoringReq[]){
    const api = this.restApiCfg.getRestApi("post.category.scoring");
    
    return this.restApi.request(api.method, api.url, { id, categoryId }, null, data)
  }

  //职称
  professionalTitle = this.dict.get({ 
    owner : "USER_INFO",
    field : "PROFESSIONAL_TITLE"
  })

  type = this.dict.get({ 
    owner : "ASSESS",
    field : "TYPE"
  })
  itemType = this.dict.get({ 
    owner : "TEMPLATE_ITEM",
    field : "TYPE"
  })
  status = this.dict.get({ 
      owner : "GLOBAL",
      field : "STATUS"
  })
}