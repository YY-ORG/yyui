import { NgModule } from '@angular/core';

// common

import { CommonComponentModule } from '../../components/common.module';
import { PipeModule } from '../../pipe';

//routing
import { ContentRouting } from './content.routing';

//component
import { TablebodyComponent } from './tablebody/tablebody.component';
import { TableStructureComponent } from './table-structure/table-structure.component';
//service


@NgModule({
    imports: [
        ContentRouting,
        CommonComponentModule,
        PipeModule
    ],
    declarations: [
        TablebodyComponent,
        TableStructureComponent
    ],
    exports: [
    ],
    providers: [
        // MngConsoleService
    ]

})
export class ContentModule { }
