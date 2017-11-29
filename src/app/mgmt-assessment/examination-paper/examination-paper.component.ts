import { Component,  OnInit, ViewEncapsulation, ChangeDetectorRef, ViewChild  } from '@angular/core';

import { INglDatatableSort, INglDatatableRowClick } from 'ng-lightning/ng-lightning';
import { SpinnerComponent, Validation, ValidationRegs } from '../../../components'
import { PageClass } from '../../../class/page/page.class'
import { OrderByPipe } from '../../../pipe/orderby' 

import { Adminui, Assess } from '../../../core';

import { ExaminationPaperService } from './examination-paper.service'
import { WizardComponent } from 'ng2-archwizard'
import { ExaminationAssessComponent }  from '../../components/examination-assess/examination-assess'


@Component({
	selector: 'examination-paper',
	styleUrls: ["./examination-paper.scss"],
	templateUrl: "./examination-paper.template.html",
	encapsulation: ViewEncapsulation.None
})
export class ExaminationPaperComponent extends PageClass implements OnInit {
	@ViewChild(WizardComponent) public wizard: WizardComponent;
	@ViewChild(ExaminationAssessComponent) public examinationAssess: ExaminationAssessComponent;
	
	constructor(
		private service: ExaminationPaperService,
		public v: Validation,
		private cdr: ChangeDetectorRef,
		private orderBy: OrderByPipe
	) {
		super()
		this.v.result = {}
	}

	willDeleteUser;
	editModalOpen: boolean = false;
	addModalOpen: boolean = false;
	selectedTab: any;
	assesspaperlist: Assess.AssessPaperItem[] = []
	currentAssessPaper: Assess.AssessPaperItem
	assesslist: Assess.AssessMenuItem[] = []
	groupItem: Assess.AssessGroupItem[] = []
	selectGroup: Assess.AssessGroupItem = null
	currentAssesst: Assess.AssessMenuItem
	examination: Assess.AssessItem
	
	templateItemList: Assess.TemplateItem[] = []
	curremtTemplateForm: Assess.TemplateItem
	curremtTable: Assess.TemplateItem
	curremtTemplateTable: Assess.TemplateItem
	templateItemItemList: Assess.TemplateItemItem[]
	tableList: Assess.TemplateItemItem[]
	templateTableList: Assess.TemplateItemItem[]
	complexTemplateList: Assess.ComplexTemplateItem[] = []

	tableItemList= [{ type: '15' }]

	ngOnInit() {
		this.getPaper()
	}

	getPaper () {
		this.spinner.show()
		this.service.fetchAssesspaperlist().then(res => {
			this.spinner.hide()
			this.assesspaperlist = res
			setTimeout(() => {
				(document.querySelector('.slds-tabs--default__link') as HTMLElement).click()
				if (res.length) {
					// this.getAssesslist(res[0])
				}
			})
		}).catch(e => this.spinner.hide())
	}

	getAssesslist (paper: Assess.AssessPaperItem) {
		this.cdr.detectChanges()
		
		this.currentAssessPaper = paper
		this.spinner.show()
		this.service.fetchAssesslist(paper.id).then(res => {
			this.spinner.hide()
			if (!res.length) {
				return
			}
			this.groupItem = res
			
		}).catch(e => this.spinner.hide())
	}

	selectGroupChange ($event) {
		this.cdr.detectChanges()
		this.assesslist = []
		setTimeout(() => {
			this.assesslist = this.selectGroup.assessItemList
			this.cdr.detectChanges()
			this.getItem(this.assesslist[0])
		})
	}

	goToStep (index: number) {
		this.complexTemplateList = []
		let preFinalize = {
			emit: () => {
				this.getItem(this.assesslist[index])
			}
		}
		this.wizard.model.navigationMode.goToStep(index, preFinalize)
	}

	nextSteap (index: number) {
		if (this.examination.type == '3') {
			return this.goToStep(index)
		}

		let errorMsg = this.examinationAssess.checkValue()
		if (errorMsg) return this.alert.open(errorMsg)

		let data = [{
				templateId: this.curremtTemplateForm.id,
				seqNo: '',
				itemList: this.templateItemItemList.map(item => item.reqDate)
		}]
		this.spinner.show()
		this.service.postAssess(this.currentAssessPaper.id, this.currentAssesst.assessId, data)
			.then(res => {
				this.spinner.hide()
				this.goToStep(index)
			}).catch(e => this.spinner.hide())
	}

	send (ddd) {
		console.log(ddd)
	}

	getItem(assesst: Assess.AssessMenuItem) {
		this.currentAssesst = assesst
		this.spinner.show()
		this.service.fetchExamination(assesst.assessId).then(res => {
			this.examination = res
			this.templateItemList = this.examination.templateItemList
			this.templateItemList.forEach(template => {
				if (template.type == '0') this.curremtTemplateForm = template
				if (template.type == '3') this.curremtTemplateTable = template
			})
			this.curremtTemplateForm = this.templateItemList.filter(template => template.type == '0')[0]
			this.curremtTable = this.templateItemList.filter(template => template.type == '1')[0]
			this.curremtTemplateTable = this.templateItemList.filter(template => template.type == '2')[0]
			this.templateItemItemList = this.curremtTemplateForm ? this.curremtTemplateForm.templateItemItemList : []
			this.tableList = this.curremtTable ? this.curremtTable.templateItemItemList : []
			this.templateTableList = this.curremtTemplateTable ? this.curremtTemplateTable.templateItemItemList : []

			if (this.curremtTemplateTable) {
				this.getTemplateTableList()
			}

			setTimeout(() => {
				this.spinner.hide()
			}, 0)
		})
	}

	getTemplateTableList() {
		this.spinner.show()
		const id = this.templateTableList.filter(list => list.type == '15')[0].valueOwner
		this.service.fetchTableList(id).then(res => {
			this.spinner.hide()
			this.complexTemplateList = res
		}).catch(e => this.spinner.hide())
	}

	selectedChange(ngTab: any) {
		if (!this.assesspaperlist.length) return
		this.getAssesslist(this.assesspaperlist[ngTab.id])
		this.assesslist = []
	}
	
	onConfirm() {
		this.confirm.close()

		setTimeout(() => {
			this.alert.open("删除成功")
		}, 1000)
	}

	con (data) {
		console.log(data)
	}

}

