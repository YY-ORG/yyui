import { NgModule } from '@angular/core';

// common

import { CommonComponentModule } from '../../components/common.module';
import { PipeModule } from '../../pipe';

//routing
import { HomeRouting } from './home.routing';

//component
import { IndexComponent } from './index/index.component';

//service


@NgModule({
    imports: [
        HomeRouting,
        CommonComponentModule,
        PipeModule
    ],
    declarations: [
        IndexComponent,
    ],
    exports: [
    ],
    providers: [
        // MngConsoleService
    ]

})
export class HomeModule { }
