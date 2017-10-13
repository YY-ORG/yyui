import { Injectable } from "@angular/core";
import { RestApi } from "./restapi.service";
import { RestApiCfg } from "./restapicfg.service";

let dicPromise : Promise<Array<any>>;

@Injectable()
export class SystemDictionaryService {
    constructor(
        private restApiCfg: RestApiCfg,
        private restApi: RestApi,
    ) {
    }

    get(cf:{owner?:string,field?:string,code?:string} = {}):Promise<Array<any>>{

        const api = this.restApiCfg.getRestApi("sysdic");

        dicPromise = dicPromise ? dicPromise : this.restApi.request(api.method, api.url, undefined, undefined, undefined)
            .catch(error => {
                console.log("获取全部数据词典的服务器错误")
            });

        return dicPromise.then(dictList => {
            return dictList.filter(dict => {
                return  (!cf.code || dict.code === cf.code) 
                        && (!cf.owner || dict.owner === cf.owner) 
                        && (!cf.field || dict.field === cf.field)
            })
        })
    };

}