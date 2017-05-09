import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule, ConnectionBackend, Jsonp } from '@angular/http';
import { RestApiCfg } from './service/restapicfg.service';
import { RestApi } from './service/restapi.service';
import { SystemDictionaryService } from './service/system.dictionary.service';
@NgModule({
    imports: [
        CommonModule,
        HttpModule
    ],
    declarations: [

    ],
    exports: [
        HttpModule
    ],
    providers: [
        // ConnectionBackend,
        Jsonp,
        RestApiCfg,
        RestApi,
        SystemDictionaryService,
    ]
})
export class CoreModule {
    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error('CoreModule is already loaded. Import it in the AppModule only');
        }
    }
   
}