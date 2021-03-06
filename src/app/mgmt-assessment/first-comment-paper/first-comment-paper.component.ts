import { Component,  OnInit, ViewEncapsulation, ChangeDetectorRef, ViewChild  } from '@angular/core';

import { INglDatatableSort, INglDatatableRowClick } from 'ng-lightning/ng-lightning';
import { SpinnerComponent } from '../../../components'
import { PageClass } from '../../../class/page/page.class'
import { SystemDictionaryService, RestApiCfg, RestApi, Adminui, Assess, Common } from '../../../core';
import { FirstCommentPaperService } from './first-comment-paper.service'
import { Router, ActivatedRoute } from "@angular/router";
import { ExaminationPaperService } from '../examination-paper/examination-paper.service'
import { WizardComponent } from 'ng2-archwizard'
import { ExaminationAssessComponent }  from '../../components/examination-assess/examination-assess'

@Component({
	selector: 'first-comment-paper',
	styleUrls: ["./first-comment-paper.scss"],
	templateUrl: "./first-comment-paper.template.html",
	encapsulation: ViewEncapsulation.None
})
export class FirstCommentPaperComponent extends PageClass implements OnInit {
	constructor(
		private service: FirstCommentPaperService,
		private route: ActivatedRoute,
		private cdr: ChangeDetectorRef,
		private epService: ExaminationPaperService,
    private router: Router
	) {
		super()
	}
	@ViewChild(WizardComponent) public wizard: WizardComponent;
	@ViewChild('examinationAssess') public examinationAssess: ExaminationAssessComponent;
	
	willDeleteUser;
	editModalOpen: boolean = false;
	groupAnswerItemList: Assess.SimpleAssessGroupAnswerItem[] = []
	groupItem: Assess.AssessGroupItem[] = []
	selectGroup: Assess.AssessGroupItem = null
	assesslist: Assess.AssessMenuItem[] = []
	currentAssesst: Assess.AssessMenuItem
	examination: Assess.AssessItem
	
	templateItemList: Assess.TemplateItem[] = []
	curremtTemplateForm: Assess.TemplateItem
	curremtTable: Assess.TemplateItem
	curremtTemplateTable: Assess.TemplateItem
	templateItemItemList: Assess.TemplateItemItem[] = []
	tableList: Assess.TemplateItemItem[] = []
	templateTableList: Assess.TemplateItemItem[] = []
	complexTemplateList: Assess.ComplexTemplateItem[] = []
	formTableFormTemplateId: string = ''
	currentAssessPaper: Assess.AssessPaperItem = new Assess.AssessPaperItem
	commentReq: Assess.MarkedAssessAnswer = new Assess.MarkedAssessAnswer

	currentPage: number = 0
	maxPage: number = 1
	paperStatus: number = 1; // 试卷状态
	currentStep = 0

	isFirstComment : boolean = false

	private sub: any;
	paperid: string;
	userid: string;
	tableItemList= [{ type: '15', scVisible: true, auVisible: true }]

	ngOnInit() {
		// paperid/:userid
		this.isFirstComment = this.router.url.indexOf('first-comment') > -1
		this.sub = this.route.params.subscribe(params => {
			this.paperid = params.paperid
			this.userid = params.userid
			this.currentAssessPaper.id = params.paperid

			this.getAssessanswerlist()
			this.getAssesslist()
		});
	}

	getAssesslist () {
		this.epService.fetchAssesslist(this.paperid).then(res => {
			this.groupItem = res
		})
	}

	continueAnswer(groupAnswer: Assess.SimpleAssessGroupAnswerItem, currentDisable: boolean = false) {
		this.selectGroup = this.groupItem.filter(group => group.id === groupAnswer.groupId)[0]
		this.selectGroupChange()
	}

	getItem(assesst: Assess.AssessMenuItem) {
		this.currentAssesst = assesst
		this.spinner.show()
		this.epService.fetchExamination(assesst.assessId).then(res => {
			this.examination = res
			this.templateItemList = this.examination.templateItemList
			this.templateItemList.forEach(template => {
				if (template.type == '0') this.curremtTemplateForm = template
				if (template.type == '2') this.curremtTemplateTable = template
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

	markassessanswer (assesst: Assess.AssessMenuItem) {
		this.service.fetchMarkassessanswer(this.paperid, assesst.assessId, this.userid).then(res => {
			// let len = this.templateItemList.length

			// if (len === 1 && this.templateItemList[0].type == '0') {
			// 	console.log('单表单')
			// } else if (len === 1 && this.templateItemList[0].type == '2') {
			// 	console.log('表单表格混合')
			// } else if (len >= 2) {
			// 	console.log('表格')
			// }
			// console.log(this.templateItemItemList, this.templateItemList, res, 9090)
			console.log('commentReq', res)
			this.commentReq = res
		})
	}

	getTemplateTableList() {
		this.spinner.show()
		this.formTableFormTemplateId = this.templateTableList.filter(list => list.type == '15')[0].valueOwner
		this.epService.fetchTableList(this.formTableFormTemplateId).then(res => {
			this.spinner.hide()
			this.complexTemplateList = res
		}).catch(res => {
			this.spinner.hide()
			this.alert.open(res)
		})
	}

	selectGroupChange ($event?) {
		this.cdr.detectChanges()
		this.assesslist = []
		setTimeout(() => {
			this.assesslist = this.selectGroup.assessItemList
			this.cdr.detectChanges()

			const $ul = document.querySelector('.steps-indicator') as HTMLElement
			$ul.addEventListener('click', (env) => {
				console.count()
				// 点击的位置，除以，每个单元的宽度
				const index = Math.floor(((env as any).clientX - 258) / ($ul.offsetWidth / this.wizard.model.wizardSteps.length))
				// this.getItem(this.assesslist[index])
				this.confirmGoToStep(index)
			}, true)

			this.getItem(this.assesslist[0])
			this.goToStep(0)
		})
	}

	goToStep (index: number) {
		if (index < 0 || index >= this.assesslist.length) {
			return this.goToIndex()
		}
		this.markassessanswer(this.assesslist[index])
		this.complexTemplateList = []
		let preFinalize = {
			emit: () => {
				console.log(6, index)
				this.getItem(this.assesslist[index])
			}
		}
		this.currentStep = index
		this.wizard.model.navigationMode.goToStep(index, preFinalize)
	}


	goToIndex () {
		this.selectGroup = null
		this.assesslist = []
		this.getAssessanswerlist()
		this.getAssesslist()
	}

	setComment (index = this.currentStep + 1) {
		console.log(33333, this.tableList)
		if (this.tableList.length) {
			return this.goToStep(index)
		}

		this.spinner.show()
		Promise.all([this.examinationAssess.submit(this.userid), this.examinationAssess.submitComment()]).then(res => {
			this.spinner.hide()
			this.goToStep(index)
		}).catch(e => {
			this.spinner.hide()
		})
	}

	confirmGoToStep (index: number) {
		if (!this.examinationAssess.isEdit) {
			return this.goToStep(index)
		}
		this.confirm.open('是否保存本题评分？')
		this.onConfirm = () => {
			this.confirm.close()
			this.setComment(index)
		}
		this.onCancel = () => {
			this.goToStep(index)
		}
	}

	nextSteap (index: number) {
		// this.examinationAssess.submit()
		// 	.then(res => {
		// 		this.goToStep(index)
		// 	})
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

	getAssessanswerlist () {
		this.spinner.show()
		this.service.fetchAssessanswerlist(this.paperid, this.userid).then((res) => {
			this.spinner.hide()
			const { status, groupAnswerItemList } = res
			if (!groupAnswerItemList.length) {
				return this.alert.open('没有找到相关分组')
			}

			this.paperStatus = status
			this.groupAnswerItemList = groupAnswerItemList
		}).catch(res => {
			this.spinner.hide()
			this.alert.open(res)
		})
	}

	gotoPaper (unmarklist: Assess.AssessPaperExamineeMapItem) {
		this.router.navigate(['/product-details', unmarklist.assessPaperId]);

	}

	submiteComment () {
		let hasUnStarted =  false
		this.groupAnswerItemList.forEach(res => {
			if (res.unstartedCount > 0) {
				hasUnStarted = true
			}
		})
		this.confirm.open(hasUnStarted ? '您还有未评分试题，提交后将无法再做更改，是否确认提交评分？' : '提交后将无法再做更改，是否确认提交评分？')
		this.onConfirm = function () {
			this.confirm.close()
			this.spinner.show()
			let service = this.isFirstComment ? this.service.postPaperMarkassessanswer.bind(this.service) : this.service.postPaperAuditassessanswer.bind(this.service)
			service(this.paperid, this.userid).then(res => {
				this.spinner.hide()
				this.alert.open('提交成功', () => {
					this.router.navigate(['/mgmt-assessment/re-comment'])
				})
			}).catch(res => {
				this.spinner.hide()
				this.alert.open(res)
			})
		}
  }

	onConfirm() {
	}
	onCancel() {
	}
	ngOnDestroy() {
	  this.sub.unsubscribe();
	}

}

