import { NgModule } from '@angular/core';

// common

import { CommonComponentModule } from '../../../components/common.module';
import { PipeModule } from '../../../pipe';

//component
import { RegistrationComponent } from './registration';

//service\
import { RegistrationService } from "./registration.service"


@NgModule({
    imports: [
        CommonComponentModule,
        PipeModule,
    ],
    declarations: [
      RegistrationComponent
    ],
    exports: [
      RegistrationComponent
    ],
    providers: [
      RegistrationService
    ]

})
export class RegistrationModule { }
