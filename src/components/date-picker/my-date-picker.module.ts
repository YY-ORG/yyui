import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MyDatePicker} from './my-date-picker.component';
import {InputFocusDirective} from './directives/my-date-picker.input.directive';
import { NglModule } from 'ng-lightning/ng-lightning';


@NgModule({
    imports: [ CommonModule, NglModule ],
    declarations: [ MyDatePicker, InputFocusDirective ],
    exports: [ MyDatePicker, InputFocusDirective ]
})
export class MyDatePickerModule { }
