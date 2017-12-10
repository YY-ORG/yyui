
import { Pipe, PipeTransform, Injectable } from "@angular/core";
import { Http, Response, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { SystemDictionaryService, RestApiCfg, RestApi, Adminui, Assess } from '../core';

@Pipe({
    name: "getFileName"
})

@Injectable()
export class getFileNamePipe implements PipeTransform {
    constructor(private http:Http,
                private restApiCfg:RestApiCfg,
                public dict:SystemDictionaryService,
                private restApi:RestApi) {
    }
    

    transform(value: string): Promise<any> {
        const api = this.restApiCfg.getRestApi("file.info");
        
        let headers: Headers = new Headers();
        
        let options = new RequestOptions({ headers: headers as any });
        
        return this.http.get(api.url.replace('{id}', value), options).toPromise().then(res => {
            const contentDisposition = res.headers.get('Content-Disposition');
            console.log(contentDisposition, res.headers)
        })
    }
}
