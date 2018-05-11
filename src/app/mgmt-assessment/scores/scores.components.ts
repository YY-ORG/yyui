import { Component,  OnInit, ViewEncapsulation  } from '@angular/core';

import { INglDatatableSort, INglDatatableRowClick } from 'ng-lightning/ng-lightning';
import {
  Validation, ValidationRegs, SpinnerComponent, AlertComponent
} from '../../../components'
import { PageClass } from '../../../class/page/page.class'

import {
	Router
  } from "@angular/router";


  import {
	Adminui, Assess
  } from '../../../core';
import {
 ScoresService
} from "./scores.service"

@Component({
	selector: 'scores',
	styleUrls: ["./scores.scss"],
	templateUrl: "./scores.template.html",
	encapsulation: ViewEncapsulation.None
})
export class ScoresComponent implements OnInit {
	constructor(
	  public v: Validation,
	  private router: Router,
	  public service: ScoresService
	) {
	  this.v.result = {}
	}
	

	assessPaperId: string = ''
	orgId: string = ''
	title: string = ''

	organizationList: Adminui.OrganizationItem[] = []

	ngOnInit() {
		this.fetchOrganizations();
	}

	private fetchOrganizations() {
		this.service.fetchOrganizations().then(res => {
		  this.organizationList = res;
		})
	  }

  checkValue(key ? : string) {
    let regs: ValidationRegs = {
    }

    return this.v.check(key, regs);
  }

	onConfirm() {
	}

}

