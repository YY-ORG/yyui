import { NgModule } from '@angular/core';

// common

import { CommonComponentModule } from '../../components/common.module';
import { PipeModule } from '../../pipe';

//routing
import { otherPageRouting } from './other-page.routing';

//component
import { UserDetailComponent } from './user-detail/user-detail.component';
//service
import { UserdetailService } from './user-detail/user-detail.service'


@NgModule({
    imports: [
        otherPageRouting,
        CommonComponentModule,
        PipeModule
    ],
    declarations: [
        UserDetailComponent,
    ],
    exports: [
    ],
    providers: [
        UserdetailService
    ]

})
export class OtherPageModule { }
