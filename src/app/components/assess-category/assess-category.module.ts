import { NgModule } from '@angular/core';

// common

import { CommonComponentModule } from '../../../components/common.module';
import { PipeModule } from '../../../pipe';

//component
import { AssessCategoryComponent } from './assess-category';

//service\
import { AssessCategoryService } from "./assess-category.service"


@NgModule({
    imports: [
        CommonComponentModule,
        PipeModule,
    ],
    declarations: [
      AssessCategoryComponent
    ],
    exports: [
      AssessCategoryComponent
    ],
    providers: [
      AssessCategoryService
    ]

})
export class AssessCategoryModule { }
