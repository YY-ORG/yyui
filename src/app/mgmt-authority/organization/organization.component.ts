import { Component,  OnInit, ViewChild } from '@angular/core';

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
	editModalOpen: boolean = false;
	addOrganization: boolean = false
	pageSize = 10;
	currentPage = 0
	maxSize = 1
	organizationList: Adminui.OrganizationItem[] = []
	allOrganization: Adminui.RoleItem[] = []

	currentOrganization: Adminui.OrganizationProfile = new Adminui.OrganizationProfile
	newOrganization: Adminui.OrganizationProfile = new Adminui.OrganizationProfile

	ngOnInit() { 
		this.getOrganizationList()
		// this.getAllOrganization()
	}

	// getAllOrganization () {
	// 	this.service.fetchAllOrganization().then(res => {
	// 		this.allOrganization = res
	// 	})
	// }

	getOrganizationList () {
		this.spinner.show()
		this.service.fetchAllOrganizations(this.currentPage, this.pageSize).then(res => {
			let [pageInfo, userItem] = res
			this.currentPage = pageInfo.currentPage
			this.maxSize = pageInfo.totalPage

			this.spinner.hide()
			this.organizationList = userItem
		})
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
			}).catch(e => this.spinner.hide())
		}
	}

	saveOrganization() {
		this.spinner.show()
		
		this.service.putEditOrganization(this.currentOrganization.id, this.currentOrganization).then(res => {
			this.spinner.hide()
			this.editModalOpen = false
			this.getOrganizationList()
		})
	}

	editOrganization(organization: Adminui.OrganizationItem) {
		this.currentOrganization = {
			id: organization.id,
			description: organization.description,
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

