import { Component,  OnInit, ViewEncapsulation  } from '@angular/core';

import { INglDatatableSort, INglDatatableRowClick } from 'ng-lightning/ng-lightning';
import { SpinnerComponent } from '../../../components'
import { PageClass } from '../../../class/page/page.class'
import { PersonalDataService } from './personal-data.service'
import { Router } from "@angular/router";

@Component({
	selector: 'personal-data',
	styleUrls: ["./personal-data.scss"],
	templateUrl: "./personal-data.template.html"
})
export class PersonalDataComponent extends PageClass implements OnInit {
	constructor(
        private router: Router,
		private service: PersonalDataService
	) {
		super()
	}

	userInfo = this.service.userInfo

	ngOnInit() {
		console.log(this.userInfo)
	}
	
	saveUser() {
		this.spinner.show()
		this.userInfo.password = null
		
		this.service.putEditAccount(this.userInfo.userId, this.userInfo).then(res => {
			this.spinner.hide()
			this.alert.open('修改资料成功！', () => {
				this.router.navigateByUrl("/other-page/user-detail");
			})
			localStorage["userInfo"] = JSON.stringify(this.userInfo)
		})
	}
	
}

