import { Component, Input, Output, EventEmitter, OnChanges, SimpleChange, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { SiteService } from './site.service'

@Component({
	selector: 'site',
	templateUrl: "./site.template.html",
	styleUrls: ["./site.scss"]
})
export class SiteComponent implements OnInit {

	meunList: any;
	userMenuPopverOpen: boolean = false
	userInfo: any

	constructor(
		private service: SiteService,
        private router: Router
	) {
		this.userInfo = this.service.userInfo
	}

	ngOnInit() {
		this.service.getMenuList().then(res => {
			if (!res || !res.length) {
				this.router.navigateByUrl("/other-page/user-detail");
			}
			this.meunList = res
		})
	}

	logout() {
		window.localStorage['jwt'] = ''
		window.localStorage['userInfo'] = ''
		window.location.href = "/login";
	}

	changeMenu(menu) {
		let currentMenuIsOpen = menu.isOpen
		this.meunList.forEach(m => m.isOpen = false)

		if(!currentMenuIsOpen) menu.isOpen = true
	}

	trackByFn(index, item) {
		console.log(item.orderBy)
		return +item.orderBy || 0;
	}
}

