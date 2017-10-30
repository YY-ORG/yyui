import { Component,  OnInit,  } from '@angular/core';

import { INglDatatableSort, INglDatatableRowClick } from 'ng-lightning/ng-lightning';
import { SpinnerComponent } from '../../../components'
import { PageClass } from '../../../class/page/page.class'

import { AccountService } from './account.service'

import { Adminui, Common } from '../../../core';

@Component({
	selector: 'account',
	templateUrl: "./account.template.html"
})
export class AccountComponent extends PageClass implements OnInit {
	constructor(
		private service: AccountService,
	) {
		super()
	}

	willDeleteUser;
	editModalOpen: boolean = false;
	pageSize = 10;
	currentPage = 0
	maxSize = 1
	userList: Adminui.UserProfile[] = []

	currentUser: Adminui.UserProfile = new Adminui.UserProfile

	ngOnInit() {
		// const roleNameList = this.service.userInfo.roles.map(role => role.roleName)
		// if (roleNameList.indexOf('系统管理员') > -1) {
		// 	this.service.fetchAccountList(this.currentPage, this.pageSize)
		// 		.then(res => {
		// 			console.log(res, '系统管理员')
		// 		})
		// } else if (roleNameList.indexOf('机构管理员') > -1) {
		// 	this.service.fetchIdAccountList(this.service.userInfo.organizationId, this.currentPage, this.pageSize)
		// 		.then(res => {
		// 			console.log(res, '机构管理员')
		// 		})
		// }
		this.getAccountList()
	}

	getAccountList () {
		this.spinner.show()
		this.service.queryAccountList(null, this.currentPage, this.pageSize).then(res => {
			let [pageInfo, userItem] = res
			this.currentPage = pageInfo.currentPage
			this.maxSize = pageInfo.totalPage

			this.spinner.hide()
			this.userList = userItem
		})
	}
	
	deleteUser(user: Adminui.UserProfile) {
		this.willDeleteUser = user;
		this.confirm.open("确定要删除此用户吗？")
	}

	saveUser() {
		this.spinner.show()
		this.service.putEditAccount(this.currentUser).then(res => {
			this.spinner.hide()
			this.editModalOpen = false
		})
	}

	editUser(user: Adminui.UserProfile) {
		this.editModalOpen = true

		this.currentUser = user
	}

	onConfirm() {
		this.confirm.close()

		setTimeout(() => {
			this.alert.open("删除成功")
		}, 1000)
		console.log("23")
	}

}

