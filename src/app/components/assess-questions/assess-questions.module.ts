import { NgModule } from '@angular/core';

// common

import { CommonComponentModule } from '../../../components/common.module';
import { PipeModule } from '../../../pipe';

//component
import { AssessQuestionsComponent } from './assess-questions';

//service\
import { AssessQuestionsService } from "./assess-questions.service"


@NgModule({
    imports: [
        CommonComponentModule,
        PipeModule,
    ],
    declarations: [
      AssessQuestionsComponent
    ],
    exports: [
      AssessQuestionsComponent
    ],
    providers: [
      AssessQuestionsService
    ]

})
export class AssessQuestionsModule { }
