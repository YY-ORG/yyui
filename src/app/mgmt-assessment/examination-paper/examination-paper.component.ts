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
	@ViewChild('examinationAssess') public examinationAssess: ExaminationAssessComponent;
	
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
	paperStatus: number = 1; // 试卷状态
	selectedTab: any;
	assesspaperlist: Assess.AssessPaperItem[] = []
	currentAssessPaper: Assess.AssessPaperItem
	assesslist: Assess.AssessMenuItem[] = []
	groupItem: Assess.AssessGroupItem[] = []
	groupAnswerItemList: Assess.SimpleAssessGroupAnswerItem[] = []
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
	formTableFormTemplateId: string = ''

	tableItemList= [{ type: '15' }]
	currentStep = 0

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
		}).catch(res => {
			this.spinner.hide()
			this.alert.open(res)
		})
	}

	getAssesslist (paper: Assess.AssessPaperItem) {
		this.cdr.detectChanges()
		
		this.currentAssessPaper = paper
		this.spinner.show()
		Promise.all([this.service.fetchAssesslist(paper.id), this.service.fetchAssessanswerlist(paper.id)]).then(res => {
			this.spinner.hide()
			let [groupItem, { status, groupAnswerItemList }] = res
			if (!groupAnswerItemList.length) {
				return this.alert.open('没有找到相关分组')
			}

			this.paperStatus = status
			this.groupAnswerItemList = groupAnswerItemList
			this.groupItem = groupItem
		}).catch(res => {
			this.spinner.hide()
			this.alert.open(res)
		})
	}

	continueAnswer(groupAnswer: Assess.SimpleAssessGroupAnswerItem) {
		this.selectGroup = this.groupItem.filter(group => group.id === groupAnswer.groupId)[0]
		this.selectGroupChange()
	}

	selectGroupChange ($event?) {
		this.cdr.detectChanges()
		this.assesslist = []
		setTimeout(() => {
			this.assesslist = this.selectGroup.assessItemList
			this.cdr.detectChanges()
			this.getItem(this.assesslist[0])
			this.goToStep(0)
		})
	}

	goToIndex () {
		this.selectGroup = null
		this.assesslist = []
	}

	confirmGoToStep (index: number) {
		if (!this.examinationAssess.isEdit) {
			return this.goToStep(index)
		}
		this.confirm.open('是否保存本题？')
		this.onConfirm = () => {
			this.confirm.close()
			this.spinner.show()
			this.examinationAssess.submit().then(res => {
				this.spinner.hide()
				this.goToStep(index)
			}).catch(res => {
				this.spinner.hide()
				this.alert.open(res)
			})
		}
	}

	goToStep (index: number) {
		this.complexTemplateList = []
		let preFinalize = {
			emit: () => {
				this.getItem(this.assesslist[index])
			}
		}
		this.currentStep = index
		this.wizard.model.navigationMode.goToStep(index, preFinalize)
	}

	nextSteap (index: number) {
		this.examinationAssess.submit()
			.then(res => {
				this.goToStep(index)
			})
		// if (this.examination.type == '3') {
		// 	return this.goToStep(index)
		// }

		// let errorMsg = this.examinationAssess.checkValue()
		// if (errorMsg) return this.alert.open(errorMsg)

		// let data = [{
		// 		templateId: this.curremtTemplateForm.id,
		// 		seqNo: '',
		// 		itemList: this.templateItemItemList.map(item => item.reqDate)
		// }]
		// this.spinner.show()
		// this.service.postAssess(this.currentAssessPaper.id, this.currentAssesst.assessId, data)
		// 	.then(res => {
		// 		this.spinner.hide()
		// 		this.goToStep(index)
		// 	}).catch(e => this.spinner.hide())
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
		this.formTableFormTemplateId = this.templateTableList.filter(list => list.type == '15')[0].valueOwner
		this.service.fetchTableList(this.formTableFormTemplateId).then(res => {
			this.spinner.hide()
			this.complexTemplateList = res
		}).catch(res => {
			this.spinner.hide()
			this.alert.open(res)
		})
	}

	selectedChange(ngTab: any) {
		if (!this.assesspaperlist.length) return
		this.getAssesslist(this.assesspaperlist[ngTab.id])
		this.assesslist = []
		this.selectGroup = null
	}

	submiteAssessanswer () {
		let hasUnStarted =  false
		this.groupAnswerItemList.forEach(res => {
			if (res.unstartedCount > 0) {
				hasUnStarted = true
			}
		})

		this.confirm.open(hasUnStarted ? '您还有未做试题，提交后将无法再做更改，是否确认提交试卷？' : '提交后将无法再做更改，是否确认提交试卷？')
		this.onConfirm = function () {
			this.confirm.close()
			this.spinner.show()
			this.service.postAssessanswer(this.currentAssessPaper.id).then(res => {
				this.spinner.hide()
				this.alert.open('提交成功')
			}).catch(res => {
				this.spinner.hide()
				this.alert.open(res)
			})
		}
	}
	
	onConfirm() {
		this.confirm.close()
	}
	onCancel() {}

	con (data) {
		console.log(data)
	}

}

