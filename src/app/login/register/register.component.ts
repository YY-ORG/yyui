import {Component, Input, Output,EventEmitter,OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Validation, ValidationRegs, SpinnerComponent, AlertComponent} from '../../../components'

import { UserProfile, RoleProfile } from '../../../core';

import { RegisterService } from "./register.service"

@Component({
    selector: 'register',
    templateUrl: "./register.template.html",
    styleUrls: ["./register.scss"],
	encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit{

    constructor(
		private v:Validation,
		private service: RegisterService
	) {
		this.v.result = {}
    }

	@ViewChild('spinner') spinner: SpinnerComponent;
	@ViewChild('alert') alert: AlertComponent;

	userProfile: UserProfile = new UserProfile;
    checkPassword: string;

    ngOnInit (){
		console.log(this.userProfile)
		this.fetchDict();
    }  

    private fetchDict() {
    }

	checkValue(key?:string){
		const regs:ValidationRegs = {
			username: [this.userProfile.loginName, [this.v.isUnBlank, this.v.isInstanceName, this.v.lengthRange(2,16)], "请输入2-16位大小写字母数字组合"],
			password: [this.userProfile.password, [this.v.isUnBlank, this.v.isPassword], "请输入大小写字母数字特殊字符组合"],
			checkPassword: [this.checkPassword, [this.v.isUnBlank, this.v.equalTo(this.userProfile.password)], "两次密码输入不一致"],
			email: [this.userProfile.email, [this.v.isUnBlank, this.v.isEmail], "email格式不正确"],
			name: [this.userProfile.userName, [this.v.isUnBlank, this.v.isBase], "姓名输入不正确"],
			birthday: [this.userProfile.birthday, [this.v.isUnBlank, this.v.isBase], "请填写正确的出生日期"],
			phone: [this.userProfile.phone, [this.v.isUnBlank, this.v.isMoblie], "手机号格式不正确"],
		}

		return this.v.check(key, regs);
	}
	

	submitForm() {
		let errorMessage = this.checkValue()

		if(errorMessage) return this.alert.open(errorMessage)

		this.spinner.show()
		this.service.submitRegister(this.userProfile).then(res => {
			this.spinner.hide()
			console.log(res)
		}).catch(e => this.spinner.hide())
		console.log(errorMessage, this.userProfile)
	}

	onDateChanged(event) {
		this.userProfile.birthday = event.formatted
	}
}

