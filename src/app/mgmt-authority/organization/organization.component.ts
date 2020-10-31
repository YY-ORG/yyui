import { Component,  OnInit, ViewChild, Input } from '@angular/core';

import { INglDatatableSort, INglDatatableRowClick } from 'ng-lightning/ng-lightning';
import { SpinnerComponent } from '../../../components'
import { PageClass } from '../../../class/page/page.class'

import { OrganizationService } from './organization.service'

import { Adminui, Common } from '../../../core';

@Component({
	selector: 'organization',
	styleUrls: ['./organization.scss'],
	templateUrl: "./organization.template.html"
})
export class OrganizationComponent extends PageClass implements OnInit {
	constructor(
		private service: OrganizationService,
	) {
		super()
	}
	
	willDeleteOrganize: Adminui.OrganizationItem;
	editModalOpen: boolean = false
	addOrganization: boolean = false
	organizationDetail: boolean = false
	pageSize = 10;
	currentPage = 0
	maxSize = 1
	rolesPageSize = 10;
	rolesCurrentPage = 0
	rolesMaxSize = 1
	organizationList: Adminui.OrganizationItem[] = []
	allOrganization: Adminui.RoleItem[] = []
	allRoles: Adminui.UserDetailsItem[] = []

	currentOrganization: Adminui.OrganizationProfile = new Adminui.OrganizationProfile
	newOrganization: Adminui.OrganizationProfile = new Adminui.OrganizationProfile

	@Input() queryName: string = ''

	ngOnInit() { 
		this.getOrganizationList()
		// this.getAllOrganization()
	}

	// getAllOrganization () {
	// 	this.service.fetchAllOrganization().then(res => {
	// 		this.allOrganization = res
	// 	})
	// }

	getOrganizationList (name?: string) {
		this.spinner.show()
		this.service.fetchAllOrganizations(this.currentPage, this.pageSize).then(res => {
			let [pageInfo, userItem] = res
			this.currentPage = pageInfo.currentPage
			this.maxSize = pageInfo.totalPage

			this.spinner.hide()
			this.organizationList = userItem
		})
	}

	queryOrganization(name: string) {
		this.spinner.show()
		this.service.queryOrganization(this.currentPage, this.pageSize, name).then(res => {
			let [pageInfo, userItem] = res
			this.currentPage = pageInfo.currentPage
			this.maxSize = pageInfo.totalPage

			this.spinner.hide()
			this.organizationList = userItem
		})
	}

	openOrganizationDetail(organization: Adminui.OrganizationProfile) {
		this.currentOrganization = organization
		this.organizationDetail = true
		this.spinner.show()
		this.service.fetchAllUsers(organization.id, this.rolesCurrentPage, this.rolesPageSize).then(res => {
			let [pageInfo, allRoles] = res
			this.rolesCurrentPage = pageInfo.currentPage
			this.rolesMaxSize = pageInfo.totalPage

			this.spinner.hide()
			this.allRoles = allRoles
		})
	}

	rolesPageChanged (pageEvent: any) {
		this.rolesCurrentPage = pageEvent.currentpage - 1
		this.openOrganizationDetail(this.currentOrganization)
	}
	
	deleteOrganization(organize: Adminui.OrganizationItem) {
		this.willDeleteOrganize = organize;
		this.confirm.open("确定要删除此部门吗？")
		this.confirm.confirm = () => {
			this.spinner.show()
			this.service.deleteOrganization(organize.id).then(res => {
				this.spinner.hide()
				this.confirm.close()
				this.getOrganizationList()
			}).catch(res => {
        this.spinner.hide()
        this.alert.open(res)
      })
		}
	}

	saveOrganization() {
		this.spinner.show()
		
		this.service.putEditOrganization(this.currentOrganization.id, this.currentOrganization).then(res => {
			this.spinner.hide()
			this.editModalOpen = false
			this.getOrganizationList()
		}).catch(res => {
			this.spinner.hide()
			this.alert.open(res)
		})
	}

	editOrganization(organization: Adminui.OrganizationItem) {
		this.currentOrganization = {
			id: organization.id,
			description: organization.desc,
			serial: organization.serial,
			name: organization.organizitionName,
			leaderId: organization.leaderId
		}
		this.editModalOpen = true
	}

	addNewOrganization () {
		this.addOrganization = true
		
	}

	pageChanged (pageEvent: any) {
		this.currentPage = pageEvent.currentpage - 1
		this.getOrganizationList()
	}

	submitNewOrganization () {
		this.service.addOrganization(this.newOrganization).then(res => {
			this.addOrganization = false
			this.newOrganization = new Adminui.OrganizationProfile
			this.getOrganizationList()
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

