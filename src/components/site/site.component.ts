import { Component, Input, Output, EventEmitter, OnChanges, SimpleChange, OnInit, ViewChild } from '@angular/core';
import { SiteService } from './site.service'

@Component({
	selector: 'site',
	templateUrl: "./site.template.html",
	styleUrls: ["./site.scss"]
})
export class SiteComponent implements OnInit {

	meunList: any;
	userMenuPopverOpen: boolean = false

	constructor(
		private service: SiteService
	) {

	}

	ngOnInit() {
		this.service.getMenuList().then(res => {
			this.meunList = res
		})
	}

	changeMenu(menu) {
		let currentMenuIsOpen = menu.isOpen
		this.meunList.forEach(m => m.isOpen = false)

		if(!currentMenuIsOpen) menu.isOpen = true
	}
}

