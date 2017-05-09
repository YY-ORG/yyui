import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClickOutsideModule } from 'ng2-click-outside';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { SiteComponent } from './site/site.component'

import { CountBarComponent } from './countBar/component/count-bar.component';
import { MyDatePickerModule } from './date-picker/my-date-picker.module';

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
        SiteComponent
    ],
    exports: [
        CommonModule,
        MyDatePickerModule,
        FormsModule,
        CountBarComponent,
        ClickOutsideModule,
        HttpModule,
        SiteComponent,
        NglModule
        
    ],
    providers : [
        Validation
    ]
})
export class CommonComponentModule { }
