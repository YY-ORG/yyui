import { Component,  OnInit, ViewEncapsulation, Input, ViewChild, OnChanges  } from '@angular/core';

import { INglDatatableSort, INglDatatableRowClick } from 'ng-lightning/ng-lightning';
import { Validation, ValidationRegs, SpinnerComponent, AlertComponent } from '../../../components'
import { PageClass } from '../../../class/page/page.class'
import { AssessTemplateitemService } from './assess-templateitem.service'

import { Adminui, Assess, Common } from '../../../core';


@Component({
	selector: 'assess-templateitem',
	styleUrls: ["./assess-templateitem.scss"],
	templateUrl: "./assess-templateitem.template.html"
})
export class TemplateitemComponent extends PageClass implements OnInit, OnChanges {
	constructor(
		public v: Validation,
    private service: AssessTemplateitemService
	) {
		super()
    this.v.result = {}
  }
  
  ownerList: string[] = []
  fieldList: string[] = []

  templateList: Assess.SimpleTemplate[] = []

  
  @Input() assessProfileReq: Assess.TemplateItemProfileReq = new Assess.TemplateItemProfileReq;

	currentTemplate: Assess.TemplateItemProfileReq = new Assess.TemplateItemProfileReq

	ngOnInit() {
    this.getOwner()
    this.getTemplateList()
  }

  ngOnChanges () {
    if (this.assessProfileReq.valueField) {
      this.getFiled()
    }
  }

  getOwner () {
    this.spinner.show()
    this.service.fetchOwner().then(res => {
      this.spinner.hide()
      this.ownerList = res
    }).catch(res => {
      this.spinner.hide()
      this.alert.open(res)
    })
  }

  getFiled () {
    this.spinner.show()
    this.service.fetchField(this.assessProfileReq.valueOwner).then(res => {
      this.spinner.hide()
      this.fieldList = res
    }).catch(res => {
      this.spinner.hide()
      this.alert.open(res)
    })
  }

  getTemplateList () {
    this.service.fetchTemplates(2).then(res => {
      console.log(res)
      this.templateList = res
    })
  }

  // type (string, optional),
  // valueSource (string, optional)

  checkValue(key ? : string) {
    let regs: ValidationRegs = {
      name: [this.assessProfileReq.name, [this.v.isUnBlank], "请输入名称"],
      code: [this.assessProfileReq.code, [this.v.isUnBlank], "请输入编码"],
      label: [this.assessProfileReq.label, [this.v.isUnBlank], "请输入元素显示名称"],
      type: [this.assessProfileReq.type, [this.v.isUnBlank], "请输入元素类型"],
    }

    if (this.assessProfileReq.type === '1') {
      regs = {
        ...regs,
        valueOwner: [this.assessProfileReq.valueOwner, [this.v.isUnBlank], "请选择类目"],
        valueField: [this.assessProfileReq.valueField, [this.v.isUnBlank], "请选择类目元素"],
      }
    }
    return this.v.check(key, regs);
  }
}

