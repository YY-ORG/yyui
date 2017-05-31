import { NgModule } from '@angular/core';

// common

import { CommonComponentModule } from '../../components/common.module';
import { PipeModule } from '../../pipe';

//routing
import { AuthorityRouting } from './authority.routing';

//component
import { UserComponent } from './user/user.component';
import { AccountComponent } from "./account/account.component"
import { ModuleComponent } from "./module/module.component"
import { ContentComponent } from "./content/content.component"
import { RoleComponent } from "./role/role.component"
//service


@NgModule({
    imports: [
        AuthorityRouting,
        CommonComponentModule,
        PipeModule
    ],
    declarations: [
        UserComponent,
        AccountComponent,
        ModuleComponent,
        ContentComponent,
        RoleComponent
    ],
    exports: [
    ],
    providers: [
        // MngConsoleService
    ]

})
export class AuthorityModule { }
