import { Component,  OnInit, ViewEncapsulation, Input, ViewChild, OnChanges  } from '@angular/core';

import { INglDatatableSort, INglDatatableRowClick } from 'ng-lightning/ng-lightning';
import { Validation, ValidationRegs, SpinnerComponent, AlertComponent } from '../../../components'
import { PageClass } from '../../../class/page/page.class'
import { ExaminationAssessService } from './examination-assess.service'
import { OrderByPipe } from '../../../pipe/orderby' 

import { Adminui, Assess, Common } from '../../../core';


@Component({
	selector: 'examination-assess-component',
	styleUrls: ["./examination-assess.scss"],
  templateUrl: "./examination-assess.template.html",
  encapsulation: ViewEncapsulation.None
})
export class ExaminationAssessComponent extends PageClass implements OnInit, OnChanges {
	constructor(
		public v: Validation,
    private service: ExaminationAssessService,
		private orderBy: OrderByPipe
	) {
		super()
    this.v.result = {}
	}
  
  @Input() templateItemItemList: Assess.TemplateItemItem[] = []
  @Input() tableList: Assess.TemplateItemItem[] = []
  @Input() tableAssessList: Assess.TemplateItemItem[] = []
  
	selectList: Promise<any>[] = []
  regList: any = {}
  
	checkValue: Function

	public editor;
	public editorContent: string;
	public editorOptions = {
			placeholder: "请输入个人述职...",
			modules: {
				toolbar: [
					['bold', 'italic', 'underline'],
					['code-block'],
					[{ 'list': 'ordered'}, { 'list': 'bullet' }],
					[{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
					[{ 'direction': 'rtl' }],                         // text direction
					[{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
					[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
				
					[{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
					[{ 'align': [] }],
				
					['clean']                                         // remove formatting button
				]
			},
	};

	ngOnInit() {
  }

  ngOnChanges() {
    this.setTemplateItemList()
  }

  setTemplateItemList () {
    this.templateItemItemList.forEach(tem => {
      tem.reqDate = {
        code: tem.code,
        id: tem.id,
        name: tem.name,
        value: tem.defaultValue || ""
      }
      if (tem.type == '11') {  // 如果是分数框
        tem.point1 = ''
        tem.point2 = ''
      }
    })
    this.templateItemItemList = this.orderBy.transform(this.templateItemItemList, 'seqNo')

    this.getSelectList()
    this.getRegList()

    this.checkValue = (code?: string, value?: string) => {
      let regs: any = {}

      if (code) {
        this.regList[code][0] = value
        return this.v.check(code, this.regList);
      }
      
      this.templateItemItemList.forEach(item => {
        this.regList[item.code][0] = item.reqDate.value
      })

      return this.v.check(null, this.regList)
    }
  }

	getSelectList () {
		this.templateItemItemList.map((templateItem, c) => {
      const {valueOwner, valueField} = templateItem
      if (valueOwner && valueField) {
        Object.assign(templateItem, { selectList: this.service.dict.get({ owner: valueOwner, field: valueField }) })
      }
    })
	}

	getRegList () {
		
    let regs = {}
    this.templateItemItemList.forEach(temp => {
      let reg = []

      // reg.push(this.v.isBase)
      if (temp.mandatory) reg.push(this.v.isUnBlank)
      if (['5', '10'].indexOf(temp.type.toString()) > -1) reg.push(this.v.isNumber)
      if (temp.type.toString() === '10') reg.push(this.v.max(100), this.v.min(0))
      if (temp.type.toString() === '11') reg.push(this.v.isPoint)

      if (temp.regExp) reg.push(temp.regExp.split(',').map(val => this.v[val]))

      regs[temp.code] = [temp.reqDate.value, reg, temp.tip || '输入有误，请检查']
    })
    this.regList = regs
	}
	
	
  onEditorBlured(quill) {
  }

  onEditorFocused(quill) {
  }

  onEditorCreated(quill) {
    this.editor = quill;
  }

  onContentChanged({ quill, html, text }) {
	}
}

