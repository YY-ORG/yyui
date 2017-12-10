import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { OrderByPipe } from './orderby';
import { dictPipe } from './dict.pipe';
import { formatDatePipe } from './formatDate.pipe';
import { decimalPlacesPipe } from './decimalPlaces.pipe';
import { ObjectToArrPipe } from './objectToArr.pipe';
import { formatCapacity } from './formatCapacity.pipe';
import { getArrValuePipe } from './getArrValue.pip';
import { getFileNamePipe } from './getFileName.pipe';

@NgModule({
    imports: [
       CommonModule
    ],
    declarations: [
        OrderByPipe,
        dictPipe,
        formatDatePipe,
        decimalPlacesPipe,
        ObjectToArrPipe,
        formatCapacity,
        getArrValuePipe,
        getFileNamePipe
    ],
    exports: [
        OrderByPipe,
        dictPipe,
        formatDatePipe,
        decimalPlacesPipe,
        ObjectToArrPipe,
        formatCapacity,
        getArrValuePipe,
        getFileNamePipe
    ],
    providers: [OrderByPipe,
        dictPipe,
        formatDatePipe,
        decimalPlacesPipe,
        ObjectToArrPipe,
        formatCapacity,
        getArrValuePipe,
        getFileNamePipe
    ]
})
export class PipeModule { }
