import { NgModule } from '@angular/core';

// common

import { CommonComponentModule } from '../../components/common.module';
import { PipeModule } from '../../pipe';

//routing
import { AuthorityRouting } from './authority.routing';

//component
import { UserComponent } from './user/user.component';
import { AccountComponent } from "./account/account.component"
//service


@NgModule({
    imports: [
        AuthorityRouting,
        CommonComponentModule,
        PipeModule
    ],
    declarations: [
        UserComponent,
        AccountComponent
    ],
    exports: [
    ],
    providers: [
        // MngConsoleService
    ]

})
export class AuthorityModule { }
