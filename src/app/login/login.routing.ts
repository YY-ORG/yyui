import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginBoxComponent } from './loginBox/loginBox.component';

import { RegisterComponent } from "./register/register.component"
import { LoginComponent } from "./login/login.component"
import { ForgetComponent } from './forget/forget.component';

export const LoginRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: '',
        component: LoginBoxComponent,
        children: [
			{
	            path: 'register',
	            component: RegisterComponent
	        },
			{
	            path: 'forget',
	            component: ForgetComponent
	        },
			{
	            path: '',
	            component: LoginComponent
	        },
        ]
    }
]);