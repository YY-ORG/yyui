import {Component, Input, Output,EventEmitter,OnChanges,SimpleChange,OnInit, HostBinding} from '@angular/core';
import {Validation, ValidationRegs} from '../../../components'

@Component({
    selector: 'register',
    templateUrl: "./register.template.html",
    styleUrls: ["./register.scss"]
})
export class RegisterComponent implements OnInit{
    constructor(
		private v:Validation
	) {
		this.v.result = {}
    }

    username: string;
    password: string;
    checkPassword: string;
    email: string;
    name: string;
    sex: string;
    phone: string;

    ngOnInit (){

    }  

	checkValue(key?:string){
		const regs:ValidationRegs = {
			username: [this.username, [this.v.isUnBlank, this.v.isInstanceName, this.v.lengthRange(2,16)], "请输入2-16位大小写字母数字组合"],
			password: [this.password, [this.v.isUnBlank, this.v.isPassword], "请输入大小写字母数字特殊字符组合"],
			checkPassword: [this.checkPassword, [this.v.isUnBlank, this.v.equalTo(this.password)], "两次密码输入不一致"],
			email: [this.email, [this.v.isUnBlank, this.v.isEmail], "email格式不正确"],
			name: [this.name, [this.v.isUnBlank, this.v.isBase], "姓名输入不正确"],
			phone: [this.phone, [this.v.isUnBlank, this.v.isMoblie], "手机号格式不正确"],
		}

		return this.v.check(key, regs);
	}
	

	checkInput() {
	}

	onDateChanged() {

	}
}

