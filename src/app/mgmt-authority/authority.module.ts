import { NgModule } from '@angular/core';

// common

import { CommonComponentModule } from '../../components/common.module';
import { PipeModule } from '../../pipe';

// module
import { RegistrationModule } from '../components/registration/registration.module'

//routing
import { AuthorityRouting } from './authority.routing';

//component
import { UserComponent } from './user/user.component';
import { AccountComponent } from "./account/account.component"
import { ModuleComponent } from "./module/module.component"
import { ContentComponent } from "./content/content.component"
import { RoleComponent } from "./role/role.component"
import { AuthorityComponent } from "./authority/authority.component"
import { OrganizationComponent } from "./organization/organization.component"

//service
import { AccountService } from "./account/account.service"
import { RoleService } from "./role/role.service"
import { OrganizationService } from "./organization/organization.service"


@NgModule({
    imports: [
        AuthorityRouting,
        CommonComponentModule,
        PipeModule,
        RegistrationModule
    ],
    declarations: [
        UserComponent,
        AccountComponent,
        ModuleComponent,
        ContentComponent,
        RoleComponent,
        AuthorityComponent,
        OrganizationComponent
    ],
    exports: [
    ],
    providers: [
        AccountService,
        RoleService,
        OrganizationService
    ]

})
export class AuthorityModule { }
