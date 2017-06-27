import { Component, Input, Output, EventEmitter, OnChanges, SimpleChange, OnInit, ViewChild, } from '@angular/core';
import { Validation, ValidationRegs, SpinnerComponent, AlertComponent } from '../../../components'

import { Router } from "@angular/router";

import { LoginService } from "./login.service"

@Component({
	selector: 'login',
	templateUrl: "./login.template.html",
	styleUrls: ["./login.scss"]
})
export class LoginComponent implements OnInit {
	constructor(
		private v:Validation,
        private router: Router,
		private service: LoginService
	) {

	}

	@ViewChild('spinner') spinner: SpinnerComponent;
	@ViewChild('alert') alert: AlertComponent;

	username: string;
	password: string;

	ngOnInit() {

	}

	login() {
		this.service.submitLogin(this.username, this.password)
			.then(res => {
				this.alert.open("登录成功！", () => {
					console.log("confirmed")
				})
			}).catch(e => this.alert.open("登录失败，请检查用户名与密码"))
	}
}

