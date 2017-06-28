import { Component, Input, Output, EventEmitter, OnChanges, SimpleChange, OnInit } from '@angular/core';
import {Validation, ValidationRegs} from '../../../components'

@Component({
	selector: 'forget',
	templateUrl: "./forget.template.html",
	styleUrls: ["./forget.scss"]
})
export class ForgetComponent implements OnInit {
	constructor(
		public v:Validation
	) {
		this.v.result = {}
    }

    email:string;

	ngOnInit() {

	}

	checkValue(key?:string){
		const regs:ValidationRegs = {
			email: [this.email, [this.v.isUnBlank, this.v.isEmail], "email格式不正确"],
		}

		return this.v.check(key, regs);
	}
}

