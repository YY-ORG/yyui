import { Component,  OnInit, ViewEncapsulation, Input, ViewChild, OnChanges  } from '@angular/core';

import { INglDatatableSort, INglDatatableRowClick } from 'ng-lightning/ng-lightning';
import { Validation, ValidationRegs, SpinnerComponent, AlertComponent } from '../../../components'
import { PageClass } from '../../../class/page/page.class'
import { ExaminationTableService } from './examination-table.service'
import { OrderByPipe } from '../../../pipe/orderby' 

import { Adminui, Assess, Common } from '../../../core';


@Component({
	selector: 'examination-table-component',
	styleUrls: ["./examination-table.scss"],
  templateUrl: "./examination-table.template.html",
  encapsulation: ViewEncapsulation.None
})
export class ExaminationTableComponent extends PageClass implements OnInit, OnChanges {
	constructor(
		public v: Validation,
    private service: ExaminationTableService,
		private orderBy: OrderByPipe
	) {
		super()
    this.v.result = {}
	}
  
  @Input() templateItemItemList: Assess.TemplateItemItem[] = []
  @Input() tableList: Assess.TemplateItemItem[] = []
  
	selectList: Promise<any>[] = []
  regList: any = {}
  
	checkValue: Function

	ngOnInit() {
  }

  ngOnChanges() {
    // console.log(arguments, '变化量')
    // this.setTemplateItemList()
  }

}

