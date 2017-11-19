import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { SystemDictionaryService, RestApiCfg, RestApi, Adminui, Assess } from '../../core';

import {} from './upload-file.component'

@Injectable()
export class FileUploadService {
  constructor(private http:Http,
              private restApiCfg:RestApiCfg,
              public dict:SystemDictionaryService,
              private restApi:RestApi) {
  }

  postfile (formData: any) {
    const api = this.restApiCfg.getRestApi("upload.file");

    let headers: Headers = new Headers();
    /** No need to include Content-Type in Angular 4 */
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    
    let options = new RequestOptions({ headers: headers as any });
   
    return this.http.post(api.url, formData, options)
  }
}