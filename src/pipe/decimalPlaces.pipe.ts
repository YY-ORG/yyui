/**** 保留小数点的位数 
	{{22.1122232323 | decimalPlaces}} ===> 22.11   //默认保留两位
	{{22.1122232323 | decimalPlaces : 4}} ===> 22.1122   //手动设置保留的位数
	{{22.00000 | decimalPlaces : 2}} ===> 22   //与toFixed的区别
*****/

import { Pipe, PipeTransform, Injectable } from "@angular/core";

@Pipe({
    name: "decimalPlaces"
})

@Injectable()
export class decimalPlacesPipe implements PipeTransform {

    transform(number:number|string, length : number = 2): number {
    	const times = Math.pow(10,length);
    	return parseInt("" + +number*times)/times;
    }
}
