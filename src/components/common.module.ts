import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClickOutsideModule } from 'ng2-click-outside';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { QuillEditorModule } from 'ngx-quill-editor';

import { SiteComponent } from './site/site.component'
import { SiteService } from './site/site.service'
import { FileUploadService } from './upload-file/upload-file.service'

import { CountBarComponent } from './countBar/component/count-bar.component';
import { MyDatePickerModule } from './date-picker/my-date-picker.module';
import { PaginationComponent } from './pagination/pagination.component';
import { SpinnerComponent } from './spinner/spinner.component'
import { AlertComponent } from './alert/alert.component'
import { ConfirmComponent } from './confirm/confirm.component'
import { ButtonComponent } from './button/button.component'
import { TagButtonComponent } from './button/tag-button.component'
import { FileUploadComponent } from './upload-file/upload-file.component'

import { PipeModule } from '../pipe/pipe.module'

import { Validation } from './validators';
import { NglModule } from 'ng-lightning/ng-lightning';
import { ArchwizardModule } from 'ng2-archwizard';
// import {MdInputModule, MdCheckboxModule, MdProgressSpinnerModule, MdButtonModule, MdSelectModule, MdTooltipModule, MdMenuModule} from '@angular/material';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ClickOutsideModule,
        HttpModule,
        RouterModule,
        NglModule.forRoot(),
        PipeModule,
        ArchwizardModule
    ],
    declarations: [
        CountBarComponent,
        SiteComponent,
        SpinnerComponent,
        AlertComponent,
        ConfirmComponent,
        ButtonComponent,
        TagButtonComponent,
        PaginationComponent,
        FileUploadComponent
    ],
    exports: [
        CommonModule,
        MyDatePickerModule,
        FormsModule,
        ArchwizardModule,
        CountBarComponent,
        ClickOutsideModule,
        HttpModule,
        SiteComponent,
        NglModule,
        SpinnerComponent,
        AlertComponent,
        ConfirmComponent,
        ButtonComponent,
        TagButtonComponent,
        PaginationComponent,
        FileUploadComponent,
        PipeModule,
        QuillEditorModule
    ],
    providers : [
        Validation,
        SiteService,
        FileUploadService
    ]
})
export class CommonComponentModule { }
