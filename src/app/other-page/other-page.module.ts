import { NgModule } from '@angular/core';

// common

import { CommonComponentModule } from '../../components/common.module';
import { PipeModule } from '../../pipe';

//routing
import { otherPageRouting } from './other-page.routing';

//component
import { UserDetailComponent } from './user-detail/user-detail.component';
import { PasswordComponent } from './password/password.component';
import { PersonalDataComponent } from './personal-data/personal-data.component';

//service
import { UserdetailService } from './user-detail/user-detail.service'
import { PasswordService } from './password/password.service'
import { PersonalDataService } from './personal-data/personal-data.service'

import { RegistrationModule } from '../components/registration/registration.module'


@NgModule({
    imports: [
        otherPageRouting,
        CommonComponentModule,
        PipeModule,
        RegistrationModule
    ],
    declarations: [
        UserDetailComponent,
        PasswordComponent,
        PersonalDataComponent
    ],
    exports: [
    ],
    providers: [
        UserdetailService,
        PasswordService,
        PersonalDataService
    ]

})
export class OtherPageModule { }
