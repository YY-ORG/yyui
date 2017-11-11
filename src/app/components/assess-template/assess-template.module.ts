import { NgModule } from '@angular/core';

// common

import { CommonComponentModule } from '../../../components/common.module';
import { PipeModule } from '../../../pipe';

//component
import { AssessTemplateComponent } from './assess-template';

//service\
import { AssessTemplateService } from "./assess-template.service"


@NgModule({
    imports: [
        CommonComponentModule,
        PipeModule,
    ],
    declarations: [
      AssessTemplateComponent
    ],
    exports: [
      AssessTemplateComponent
    ],
    providers: [
      AssessTemplateService
    ]

})
export class AssessTemplateModule { }
