import { Component,  OnInit, ViewChild, Input } from '@angular/core';

import { INglDatatableSort, INglDatatableRowClick } from 'ng-lightning/ng-lightning';
import { SpinnerComponent } from '../../../components'
import { PageClass } from '../../../class/page/page.class'

import { RegistrationComponent } from '../../components/registration/registration'

import { AccountService } from './account.service'
import { RegistrationService } from '../../components/registration/registration.service'

import { Adminui, Common } from '../../../core';

@Component({
	selector: 'account',
	styleUrls: ['./account.scss'],
	templateUrl: "./account.template.html"
})
export class AccountComponent extends PageClass implements OnInit {
	constructor(
		private service: AccountService,
		private regService: RegistrationService,
	) {
		super()
	}
	
	@ViewChild(RegistrationComponent) public registration: RegistrationComponent;
	@ViewChild('editregistration') public editregistration: RegistrationComponent;

	@Input() queryUserName: string = ''
	@Input() queryOrgId: string = ''
	
	willDeleteUser;
	editModalOpen: boolean = false;
	addAccount: boolean = false
	pageSize = 10;
	currentPage = 0
	maxSize = 1
	userList: Adminui.UserProfile[] = []
	allRoles: Adminui.RoleItem[] = []
	organizationList: Adminui.OrganizationItem[] = []

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
		this.getOrganizationList()
		this.getAllRoles()
	}

	getAllRoles () {
		this.service.fetchAllRoles().then(res => {
			this.allRoles = res
		})
	}

	getOrganizationList () {
			this.regService.fetchOrganizations().then(res => {
				this.organizationList = res;
			})
	}


	queryRoles (queryUserName?: string, queryOrgId?: string) {
		this.service.queryUsers(0, this.pageSize, queryUserName, queryOrgId).then(res => {
			let [pageInfo, userItem] = res
			this.currentPage = pageInfo.currentPage
			this.maxSize = pageInfo.totalPage

			this.spinner.hide()
			this.userList = userItem
		})
	}

	getAccountList (currentPage: number = this.currentPage, pageSize: number = this.pageSize, queryUserName: string = this.queryUserName, queryOrgId: string = this.queryOrgId) {
		this.spinner.show()
		this.service.queryUsers(currentPage, pageSize, queryUserName, queryOrgId).then(res => {
			let [pageInfo, userItem] = res
			this.currentPage = pageInfo.currentPage
			this.maxSize = pageInfo.totalPage

			this.spinner.hide()
			this.userList = userItem
		})
	}
	
	deleteUser(user: Adminui.UserProfile) {
		this.willDeleteUser = user;
		this.confirm.open("确定要删除此用户吗（用户数据将被删除）？")
		this.confirm.confirm = () => {
			this.spinner.show()
			this.service.deleteAccount(user.userId).then(res => {
				this.spinner.hide()
				this.confirm.close()
				if (this.userList.length === 1) this.currentPage -= 1
				this.getAccountList()
			}).catch(res => {
        this.spinner.hide()
        this.alert.open(res)
      })
		}
	}

	saveUser() {
		this.spinner.show()
		this.currentUser.password = this.editregistration.getPassword()
		
		this.currentUser.roles = this.allRoles.filter(role => role.selected).map(r => ({
			description: r.description,
			id: r.id,
			name: r.name,
			selected: r.selected
		}))
		this.service.putEditAccount(this.currentUser.userId, this.currentUser).then(res => {
			this.spinner.hide()
			this.editModalOpen = false
			this.getAccountList()
		})
	}

	editUser(user: Adminui.UserProfile) {
		this.editModalOpen = true
		
		this.currentUser = user
		this.allRoles.forEach(role => role.selected = false)

		this.allRoles.forEach(role => {
			this.currentUser.roles.forEach(r => {
				if( r.id === role.id ) {
					role.selected = true
				}
			})
		})
	}

	addNewAccount () {
		this.addAccount = true
	}

	pageChanged (pageEvent: any) {
		this.currentPage = pageEvent.currentpage - 1
		this.getAccountList()
	}

	submitNewUser () {
		this.registration.submitForm().then(res => {
			this.addAccount = false
			this.getAccountList()
		}).catch(error => {
			this.alert.open(error)
		})
	}

	onConfirm() {
		this.confirm.close()

		setTimeout(() => {
			this.alert.open("删除成功")
		}, 1000)
		console.log("23")
	}

}

