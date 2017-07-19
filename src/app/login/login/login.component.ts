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
	loginText: string = "登录";

	ngOnInit() {

	}

	loginKeyup($event) {
		if ($event.key === "Enter"  ) this.login()
	}

	login() {
		if( this.loginText === "登录中..." || !this.username || !this.password ) return

		this.loginText = "登录中..."
		this.service.submitLogin(this.username, this.password)
			.then(res => {
				this.service.setJwt(res.access_token)
			})
			.then( res => this.service.getUserInfo() )
			.then( res =>
				this.alert.open("登录成功！", () => {
					this.loginText = "登录"
					this.router.navigateByUrl("/index");
				})
			)
			.catch(e => {
				console.log(e)
				this.loginText = "登录"

				let message = e === "userInfo error" ? "获取用户信息失败，请稍后再试" : "登录失败，请检查用户名与密码"
				this.alert.open(message)
			})
	}
}

