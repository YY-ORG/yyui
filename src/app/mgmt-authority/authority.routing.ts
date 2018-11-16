import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SiteComponent } from "../../components"
import { UserComponent } from "./user/user.component"
import { AccountComponent } from "./account/account.component"
import { OrganizationComponent } from "./organization/organization.component"
import { ModuleComponent } from "./module/module.component"
import { ContentComponent } from "./content/content.component"
import { RoleComponent } from "./role/role.component"
import { AuthorityComponent } from "./authority/authority.component"

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
			{
	            path: 'organization',
	            component: OrganizationComponent
	        },
			{
	            path: 'module',
	            component: ModuleComponent
	        },
			{
	            path: 'content',
	            component: ContentComponent
	        },
			{
	            path: 'role',
	            component: RoleComponent
	        },
			{
	            path: 'authority',
	            component: AuthorityComponent
	        }
        ]
    }
]);