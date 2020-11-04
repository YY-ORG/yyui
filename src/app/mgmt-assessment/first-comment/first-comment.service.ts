import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { SystemDictionaryService, RestApiCfg, RestApi, Adminui, Assess, Common } from '../../../core';

@Injectable()
export class FristCommentService {
  constructor(private http:Http,
              private restApiCfg:RestApiCfg,
              private dict:SystemDictionaryService,
              private restApi:RestApi) {
  }

  userInfo = this.restApi.getLoginInfo().userInfo;

  fetchUnmarklist (page: number, size: number, examineeName?: string, annual?: string, status?: string): Promise<[Common.PageInfo, Assess.AssessPaperExamineeMapItem[]]> {
    const api = this.restApiCfg.getRestApi("get.unmarklist");
    
    return this.restApi.request(api.method, api.url, null, [{
      key: 'size',
      value: size
    }, {
      key: 'page',
      value: page
    }, {
      key: 'examineeName',
      value: examineeName
    }, {
      key: 'annual',
      value: annual
    }, {
      key: 'status',
      value: status
    }]).then((res: any) => {
        return [res.pageInfo, res.resultContent]
    }) as Promise<[Common.PageInfo, Assess.AssessPaperExamineeMapItem[]]>
  }

  fetchUnauditlist (page: number, size: number, examineeName?: string, annual?: string, status?: string): Promise<[Common.PageInfo, Assess.AssessPaperExamineeMapItem[]]> {
    const api = this.restApiCfg.getRestApi("get.unauditlist");
    
    return this.restApi.request(api.method, api.url, null, [{
      key: 'size',
      value: size
    }, {
      key: 'page',
      value: page
    }, {
      key: 'examineeName',
      value: examineeName
    }, {
      key: 'annual',
      value: annual
    }, {
      key: 'status',
      value: status
    }]).then((res: any) => {
        return [res.pageInfo, res.resultContent]
    }) as Promise<[Common.PageInfo, Assess.AssessPaperExamineeMapItem[]]>
  }

  rollbackMark(assessPaperId, aspExamineeMapId): Promise<any> {
    const api = this.restApiCfg.getRestApi("rollback.mark");
    
    return this.restApi.request(api.method, api.url, {
      assessPaperId, aspExamineeMapId
    }, null).then((res: any) => {
        return [res.pageInfo, res.resultContent]
    }) as Promise<any>
  }


  rollbackSubmit(assessPaperId, aspExamineeMapId): Promise<any> {
    const api = this.restApiCfg.getRestApi("rollback.submit");
    
    return this.restApi.request(api.method, api.url, {
      assessPaperId, aspExamineeMapId
    }, null).then((res: any) => {
        return [res.pageInfo, res.resultContent]
    }) as Promise<any>
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