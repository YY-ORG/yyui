import { NgModule } from '@angular/core';

// common

import { CommonComponentModule } from '../../../components/common.module';
import { PipeModule } from '../../../pipe';

//component
import { AssesspaperComponent } from './assess-paper';

//service\
import { AssesspaperService } from "./assess-paper.service"


@NgModule({
    imports: [
        CommonComponentModule,
        PipeModule,
    ],
    declarations: [
      AssesspaperComponent
    ],
    exports: [
      AssesspaperComponent
    ],
    providers: [
      AssesspaperService
    ]

})
export class AssessPaperModule { }
