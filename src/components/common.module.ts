import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClickOutsideModule } from 'ng2-click-outside';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { SiteComponent } from './site/site.component'
import { SiteService } from './site/site.service'

import { CountBarComponent } from './countBar/component/count-bar.component';
import { MyDatePickerModule } from './date-picker/my-date-picker.module';
import { PaginationComponent } from './pagination/pagination.component';
import { SpinnerComponent } from './spinner/spinner.component'
import { AlertComponent } from './alert/alert.component'


import { Validation } from './validators';
import { NglModule } from 'ng-lightning/ng-lightning';
// import {MdInputModule, MdCheckboxModule, MdProgressSpinnerModule, MdButtonModule, MdSelectModule, MdTooltipModule, MdMenuModule} from '@angular/material';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ClickOutsideModule,
        HttpModule,
        RouterModule,
        NglModule.forRoot()
    ],
    declarations: [
        CountBarComponent,
        SiteComponent,
        SpinnerComponent,
        AlertComponent,
        PaginationComponent,
    ],
    exports: [
        CommonModule,
        MyDatePickerModule,
        FormsModule,
        CountBarComponent,
        ClickOutsideModule,
        HttpModule,
        SiteComponent,
        NglModule,
        SpinnerComponent,
        AlertComponent,
        PaginationComponent,
    ],
    providers : [
        Validation,
        SiteService,

    ]
})
export class CommonComponentModule { }
