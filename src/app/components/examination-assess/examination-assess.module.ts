import { NgModule } from '@angular/core';

// common

import { CommonComponentModule } from '../../../components/common.module';
import { PipeModule } from '../../../pipe';

//component
import { ExaminationAssessComponent } from './examination-assess';

//service\
import { ExaminationAssessService } from "./examination-assess.service"

import { ExaminationTableModule } from '../examination-table/examination-table.module'


@NgModule({
    imports: [
        CommonComponentModule,
        PipeModule,
        ExaminationTableModule
    ],
    declarations: [
      ExaminationAssessComponent
    ],
    exports: [
      ExaminationAssessComponent
    ],
    providers: [
      ExaminationAssessService
    ]

})
export class ExaminationAssessModule { }
