import { NgModule } from '@angular/core';

// common

import { CommonComponentModule } from '../../components/common.module';
import { PipeModule } from '../../pipe';


// module
import { RegistrationModule } from '../components/registration/registration.module'

//routing
import { LoginRouting } from './login.routing';

//component
import { LoginComponent } from './login/login.component';
import { LoginBoxComponent } from './loginBox/loginBox.component';
import { RegisterComponent } from './register/register.component';
import { ForgetComponent } from './forget/forget.component';

//service\
import { RegisterService } from "./register/register.service"
import { LoginService } from "./login/login.service"


@NgModule({
    imports: [
        LoginRouting,
        CommonComponentModule,
        PipeModule,
        RegistrationModule
    ],
    declarations: [
        LoginComponent,
        LoginBoxComponent,
        RegisterComponent,
        ForgetComponent
    ],
    exports: [
        
    ],
    providers: [
        RegisterService,
        LoginService
    ]

})
export class LoginModule { }
