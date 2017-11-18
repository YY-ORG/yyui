import { Component,  OnInit, ViewEncapsulation  } from '@angular/core';

import { INglDatatableSort, INglDatatableRowClick } from 'ng-lightning/ng-lightning';
import { Validation, ValidationRegs, SpinnerComponent } from '../../../components'
import { PageClass } from '../../../class/page/page.class'
import { PasswordService } from './password.service'
import { Adminui } from '../../../core';
import { Router } from "@angular/router";


@Component({
	selector: 'password',
	styleUrls: ["./password.scss"],
	templateUrl: "./password.template.html"
})
export class PasswordComponent extends PageClass implements OnInit {
	constructor(
		public v: Validation,
		private router: Router,
		private service: PasswordService
	) {
		super()
		this.v.result = {}
	}

	passwordProfile = new Adminui.PasswordProfile
	checkPassword = ''

	ngOnInit() {
		
	}

	checkValue(key ? : string) {
	  let regs: ValidationRegs = {
		password: [this.passwordProfile.password, [this.v.isUnBlank, this.v.isPassword, this.v.lengthRange(8, 20)], "请输入8-20位大小写字母数字组合"],
		newPassword: [this.passwordProfile.newPassword, [this.v.isUnBlank, this.v.isPassword, this.v.lengthRange(8, 20)], "请输入8-20位大小写字母数字组合"],
		checkPassword: [this.checkPassword, [this.v.isUnBlank, this.v.equalTo(this.passwordProfile.newPassword)], "两次密码输入不一致"],
	  }
  
	  return this.v.check(key, regs);
	}

	savePassword() {
		let message = this.checkValue()
		if (message) {
			return this.alert.open(message)
		}

		this.spinner.show()
		// this.passwordProfile.newPassword = encodeURIComponent(this.passwordProfile.newPassword)
		// this.passwordProfile.password = encodeURIComponent(this.passwordProfile.password)
		this.service.putEditAccount(this.passwordProfile).then(res => {
			this.alert.open('修改成功！', () => {
				this.router.navigateByUrl("/other-page/user-detail");
			})
			
			this.spinner.hide()
		}).catch(res => {
			this.alert.open('修改失败')
			this.spinner.hide()
		})
	}
}

