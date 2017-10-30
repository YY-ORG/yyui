import { Component,  OnInit, ViewEncapsulation  } from '@angular/core';

import { INglDatatableSort, INglDatatableRowClick } from 'ng-lightning/ng-lightning';
import { SpinnerComponent } from '../../../components'
import { PageClass } from '../../../class/page/page.class'

import { RoleService } from './role.service'
import { Adminui } from '../../../core'

@Component({
	selector: 'roles',
	styleUrls: ['./role.scss'],
	templateUrl: "./role.template.html",
	encapsulation: ViewEncapsulation.None
})
export class RoleComponent extends PageClass implements OnInit {
	constructor(
		private service: RoleService,
	) {
		super()
	}

	willDeleteUser;
	editModalOpen: boolean = false;
	currentPage: number = 0
	roleList: Adminui.RoleItem[] = []
	menuItem: Adminui.MenuItem[] = []
	cacheRoleList: Adminui.MenuItem[] = []
	userMenuTree: Adminui.RoleDetailsItem
	maxPage: number = 1

	ngOnInit() {
		this.getRoleList()
		// this.getMenuTree()
	}

	// getMenuTree() {
	// 	this.spinner.show()
		
	// 	this.service.fetchMenuTree().then(res => {
	// 		this.menuItem = res
	// 		this.cacheRoleList = res

	// 		this.spinner.hide()
	// 	})
	// }

	getRoleList() {
		this.spinner.show()
		this.service.fetchRoleList(this.currentPage , 10)
			.then(res => {
				let [pageList, roleList] = res
				this.currentPage = pageList.currentPage
				this.maxPage = pageList.totalPage
				this.roleList = roleList
				this.spinner.hide()
			})
	}
	
	deleteUser(d) {
		this.willDeleteUser = d;
		this.confirm.open("确定要删除此用户吗？")
	}

	editUser(role: Adminui.RoleItem) {
		this.spinner.show()
		this.menuItem = this.cacheRoleList
		this.service.fetchUserMenuTree(role.id).then(res => {
			this.menuItem = res.menus
			// res.menus.forEach(hasMenu => {
			// 	this.menuItem.forEach(menu => {
			// 		if (hasMenu.id !== menu.id) return false;

			// 		menu.selected = true
			// 		hasMenu.children.forEach(hasMenuChildren => {
			// 			menu.children.forEach(m => {
			// 				if (m.id === hasMenuChildren.id) {
			// 					m.selected = true
			// 				}
			// 			})
			// 		})
			// 	})
			// })
			this.spinner.hide()
		})
		this.editModalOpen = true
	}

	pageChanged (pageEvent: any) {
		this.currentPage = pageEvent.currentpage
		this.getRoleList()
	}

	submit() {
		this.spinner.show()

		this.userMenuTree.menus = this.menuItem.filter(topMenu => {
			if (!topMenu.selected) return false
			topMenu.children = topMenu.children.filter(menu => menu.selected)
			return true
		})

		this.service.postUserMenuTree(this.userMenuTree).then(res => {
			this.spinner.hide()
			console.log(res)
		})
	}

	topCheck(topMenu: Adminui.MenuItem) {
		topMenu.children.forEach(meun => {
			meun.selected = topMenu.selected
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

