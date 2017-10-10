import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { SystemDictionaryService, RestApiCfg, RestApi, AssessItem } from '../../../core';

@Injectable()
export class ExaminationPaperService {
    constructor(private http:Http,
                private restApiCfg:RestApiCfg,
                private dict:SystemDictionaryService,
                private restApi:RestApi) {
    }
    
    fetchExamination (id: string): Promise<AssessItem> {
      const api = this.restApiCfg.getRestApi("authsec.assess");
      
      return this.restApi.request(api.method, api.url, { id }).then(res => res)
    }

}