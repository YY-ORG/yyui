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
	@ViewChild('examinationAssess') examinationAssess: ExaminationAssessComponent;
	
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
	selectedTab: any;
	assesspaperlist: Assess.AssessPaperItem[] = []
	currentAssessPaper: Assess.AssessPaperItem
	assesslist: Assess.AssessMenuItem[] = []
	currentAssesst: Assess.AssessMenuItem
	examination: Assess.AssessItem
	
	templateItemList: Assess.TemplateItem[] = []
	curremtTemplateForm: Assess.TemplateItem
	templateItemItemList: Assess.TemplateItemItem[]

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
					this.getAssesslist(res[0])
				}
			})
		}).catch(e => this.spinner.hide())
	}

	getAssesslist (paper: Assess.AssessPaperItem) {
		this.currentAssessPaper = paper
		this.spinner.show()
		this.service.fetchAssesslist(paper.id).then(res => {
			this.spinner.hide()
			if (!res.length) {
				return
			}
			this.assesslist = this.orderBy.transform(res, 'seqNo')

			this.getItem(this.assesslist[0])
			this.cdr.detectChanges()
			
		}).catch(e => this.spinner.hide())
	}

	goToStep (index: number) {
		let preFinalize = {
			emit: () => {
				this.getItem(this.assesslist[index])
			}
		}
		this.wizard.model.navigationMode.goToStep(index, preFinalize)
	}

	nextSteap (index: number) {
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
		this.service.fetchExamination(assesst.assessId).then(res => {
			this.examination = res
			this.templateItemList = this.examination.templateItemList
			this.curremtTemplateForm = this.templateItemList.filter(template => template.type == '0')[0]
			this.templateItemItemList = this.curremtTemplateForm.templateItemItemList
			this.examinationAssess.setTemplateItemList()
		})
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

