
import { Pipe, PipeTransform, Injectable } from "@angular/core";
import { Http, Response, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { SystemDictionaryService, RestApiCfg, RestApi, Adminui, Assess } from '../core';

const cache: any = {}

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
    

    transform(value: string | string[]): Promise<any> {
        const api = cache[value.toString()] ? cache[value.toString()] : cache[value.toString()] = this.restApiCfg.getRestApi("get.file.info");
        
        value = typeof value === 'string' ? [value] : value
        
        return this.restApi.request(api.method, api.url, null, null, value).then(res => {
            return res.map(r => r.name).join(',')
        })
    }
}


@Pipe({
    name: "getFileInfo"
})
@Injectable()
export class getFileInfoPipe implements PipeTransform {
    constructor(private http:Http,
                private restApiCfg:RestApiCfg,
                public dict:SystemDictionaryService,
                private restApi:RestApi) {
    }
    

    transform(value: string | string[]): Promise<any> {
        const api = cache[value.toString()] ? cache[value.toString()] : cache[value.toString()] = this.restApiCfg.getRestApi("get.file.info");
        
        value = typeof value === 'string' ? [value] : value
        
        return this.restApi.request(api.method, api.url, null, null, value).then(res => res || [])
    }
}