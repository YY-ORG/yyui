import { NgModule } from '@angular/core';

// common

import { CommonComponentModule } from '../../../components/common.module';
import { PipeModule } from '../../../pipe';

//component
import { TemplateitemComponent } from './assess-templateitem';

//service\
import { AssessTemplateitemService } from "./assess-templateitem.service"


@NgModule({
    imports: [
        CommonComponentModule,
        PipeModule,
    ],
    declarations: [
      TemplateitemComponent
    ],
    exports: [
      TemplateitemComponent
    ],
    providers: [
      AssessTemplateitemService
    ]

})
export class TemplateitemModule { }
