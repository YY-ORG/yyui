import { Component,  OnInit, ViewEncapsulation  } from '@angular/core';

import { INglDatatableSort, INglDatatableRowClick } from 'ng-lightning/ng-lightning';
import { SpinnerComponent } from '../../../components'
import { PageClass } from '../../../class/page/page.class'
import { UserdetailService } from './user-detail.service'


@Component({
	selector: 'user-detail',
	styleUrls: ["./user-detail.scss"],
	templateUrl: "./user-detail.template.html"
})
export class UserDetailComponent extends PageClass implements OnInit {
	constructor(
		private service: UserdetailService
	) {
		super()
	}

	userInfo = this.service.userInfo
	isHasAuthority = !(this.userInfo.roles.length === 1 && this.userInfo.roles[0].roleName === 'DEFAULTROLE')

	ngOnInit() {
		console.log(this.userInfo)
	}
}

