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

	private sub: any;
	paperid: string;
	userid: string;
	tableItemList= [{ type: '15' }]

	ngOnInit() {
		// paperid/:userid
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
			// this.templateItemList.forEach(template => {
			// 	if (template.type == '0') this.curremtTemplateForm = template
			// 	if (template.type == '3') this.curremtTemplateTable = template
			// })
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
			this.getItem(this.assesslist[0])
			this.markassessanswer(this.assesslist[0])
			this.goToStep(0)
		})
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

	setComment () {
		console.log('this.examinationAssess.submitComment', this.examinationAssess.submitComment())
		this.examinationAssess.submitComment().then(res => {
			this.goToStep(++this.currentStep)
			this.markassessanswer(this.assesslist[this.currentStep])
		})
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
			console.log(res, groupAnswerItemList, 'groupAnswerItemList')
		}).catch(res => {
			this.spinner.hide()
			this.alert.open(res)
		})
	}

	gotoPaper (unmarklist: Assess.AssessPaperExamineeMapItem) {
		this.router.navigate(['/product-details', unmarklist.assessPaperId]);

	}
	
	deleteUser(d) {
		this.willDeleteUser = d;
		this.confirm.open("确定要删除此用户吗？")
	}

	editUser(d) {
		this.editModalOpen = true
	}

	onConfirm() {
		this.confirm.close()

		setTimeout(() => {
			this.alert.open("删除成功")
		}, 1000)
		console.log("23")
	}
	ngOnDestroy() {
	  this.sub.unsubscribe();
	}

}

