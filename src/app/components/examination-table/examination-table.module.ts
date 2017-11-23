import { NgModule } from '@angular/core';

// common

import { CommonComponentModule } from '../../../components/common.module';
import { PipeModule } from '../../../pipe';

//component
import { ExaminationTableComponent } from './examination-table.component';

//service\
import { ExaminationTableService } from "./examination-table.service"


@NgModule({
    imports: [
        CommonComponentModule,
        PipeModule,
    ],
    declarations: [
      ExaminationTableComponent
    ],
    exports: [
      ExaminationTableComponent
    ],
    providers: [
      ExaminationTableService
    ]

})
export class ExaminationTableModule { }
