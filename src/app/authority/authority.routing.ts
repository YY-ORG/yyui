import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SiteComponent } from "../../components"
import { UserComponent } from "./user/user.component"
import { AccountComponent } from "./account/account.component"

export const AuthorityRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: '',
	    component: SiteComponent,
        children: [
			{
	            path: 'user',
	            component: UserComponent
	        },
			{
	            path: 'account',
	            component: AccountComponent
	        },
        ]
    }
]);