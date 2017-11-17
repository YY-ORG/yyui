import { Component,  OnInit, ViewEncapsulation, Input, ViewChild  } from '@angular/core';

import { INglDatatableSort, INglDatatableRowClick } from 'ng-lightning/ng-lightning';
import { Validation, ValidationRegs, SpinnerComponent, AlertComponent } from '../../../components'
import { PageClass } from '../../../class/page/page.class'
import { AssessCategoryService } from './assess-category.service'

import { Adminui, Assess, Common } from '../../../core';


@Component({
	selector: 'assess-category',
	styleUrls: ["./assess-category.scss"],
	templateUrl: "./assess-category.template.html"
})
export class AssessCategoryComponent extends PageClass implements OnInit {
	constructor(
		public v: Validation,
    private service: AssessCategoryService
	) {
		super()
    this.v.result = {}
	}
  
  @Input() assessProfileReq: Assess.AssessCategoryReq = new Assess.AssessCategoryReq;

	currentTemplate: Assess.AssessCategoryReq = new Assess.AssessCategoryReq

	ngOnInit() {
  }

  checkValue(key ? : string) {
    let regs: ValidationRegs = {
      name: [this.assessProfileReq.name, [this.v.isUnBlank], "请输入名称"],
      code: [this.assessProfileReq.code, [this.v.isUnBlank], "请输入编码"],
    }

    return this.v.check(key, regs);
  }
}

