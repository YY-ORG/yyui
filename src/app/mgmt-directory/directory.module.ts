import { NgModule } from '@angular/core';

// common

import { CommonComponentModule } from '../../components/common.module';
import { PipeModule } from '../../pipe';

//routing
import { MgmtDirectoryRouting } from './directory.routing';

//component
import { SourceComponent } from './source/source.component';
//service


@NgModule({
    imports: [
        MgmtDirectoryRouting,
        CommonComponentModule,
        PipeModule
    ],
    declarations: [
        SourceComponent,
    ],
    exports: [
    ],
    providers: [
        // MngConsoleService
    ]

})
export class MgmtDirectoryModule { }
