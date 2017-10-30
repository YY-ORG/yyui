import { Pipe, PipeTransform, Injectable } from "@angular/core";

@Pipe({
    name: "getArrValue"
})

@Injectable()
export class getArrValuePipe implements PipeTransform {
    transform(array: Array<any>, args?) {
        return array.map(a => a[args]).join(',')
    }
}