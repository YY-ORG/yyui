import { NgModule } from '@angular/core';

// common

import { CommonComponentModule } from '../../../components/common.module';
import { PipeModule } from '../../../pipe';

//component
import { ExaminationAssessComponent } from './examination-assess';

//service\
import { ExaminationAssessService } from "./examination-assess.service"


@NgModule({
    imports: [
        CommonComponentModule,
        PipeModule,
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
