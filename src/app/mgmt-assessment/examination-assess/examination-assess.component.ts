import { Component,  OnInit, ViewEncapsulation, ViewChild  } from '@angular/core';

import { INglDatatableSort, INglDatatableRowClick } from 'ng-lightning/ng-lightning';
import { SpinnerComponent } from '../../../components'
import { PageClass } from '../../../class/page/page.class'
import { ExaminationAssessService } from './examination-assess.service'

import { AssessQuestionsComponent } from '../../components/assess-questions/assess-questions'

import { Adminui, Assess, Common } from '../../../core';


@Component({
	selector: 'examination-assess',
	styleUrls: ["./examination-assess.scss"],
	templateUrl: "./examination-assess.template.html"
})
export class ExaminationAssessComponent extends PageClass implements OnInit {
	constructor(
    private service: ExaminationAssessService
	) {
		super()
	}

	willDeleteUser;
	editModalOpen: boolean = false;
	addModalOpen: boolean = false;
	assessList: Assess.SimpleAssessItem[] = []
	assessProfileReq: Assess.AssessProfileReq = new Assess.AssessProfileReq;
	currentQuestions: Assess.SimpleAssessItem;

	@ViewChild('newAssessQuestions') newAssessQuestions: AssessQuestionsComponent;
	@ViewChild('assessQuestions') assessQuestions: AssessQuestionsComponent;

	currentPage: number = 0
	maxPage: number = 1


	ngOnInit() {
		this.getQuestionsList()
	}

	getQuestionsList () {
		this.spinner.show()
		this.service.fetAssesslist(0, 10).then((res) => {
			this.spinner.hide()
			let [pageList, assessList] = res
			this.currentPage = pageList.currentPage
			this.maxPage = pageList.totalPage
			console.log(assessList)
			this.assessList = assessList
		}).catch(res => this.spinner.hide())
	}

	pageChanged (pageEvent: any) {
		this.currentPage = pageEvent.currentpage
		this.getQuestionsList()
	}

	addNewQuestions () {
		this.assessProfileReq = new Assess.AssessProfileReq
		this.newAssessQuestions.refreshList()
		this.addModalOpen = true
	}

	submiteQuestions () {
		let errorMessage = this.newAssessQuestions.checkValue()
		if (errorMessage) {
			return this.alert.open(errorMessage)
		}

		this.spinner.show()		
		this.service.postQuestions(this.assessProfileReq).then(res => {
			this.spinner.hide()		
			this.addModalOpen = false
			this.getQuestionsList()
		}).catch(e => this.spinner.hide())
	}
	
	submiteEditQuestions() {
		let errorMessage = this.assessQuestions.checkValue()
		if (errorMessage) {
			return this.alert.open(errorMessage)
		}
		
		this.spinner.show()		
		this.service.updateQuestions({
			id: this.currentQuestions.id,
			...this.assessProfileReq
		}).then(res => {
			this.spinner.hide()		
			this.editModalOpen = false
			this.getQuestionsList()
		}).catch(e => this.spinner.hide())
	}

	deleteQuestions(questions: Assess.SimpleAssessItem) {
		this.confirm.open("确定要删除此题吗？")
		this.onConfirm = () => {
			this.confirm.close()
			this.spinner.show()
			this.service.deleteQuestions(questions.id).then(res => {
				this.spinner.hide()
				this.alert.open('删除成功')
				this.getQuestionsList()
			}).catch(e => {
				this.spinner.hide()
				this.alert.open('删除失败，请稍后再试')
			})
		}
	}

	editQuestions(questions: Assess.SimpleAssessItem) {
		this.currentQuestions = questions
		
		const req = {
			code: questions.code,
			name: questions.name,
			templateId: [],
			type: questions.type
		}
		this.spinner.show()
		this.service.getAssessTemplate(questions.id).then(res => {
			this.spinner.hide()
			req.templateId = res.map(r => r.id)
			this.assessProfileReq = req
			this.assessQuestions.refreshList()
			this.editModalOpen = true
		}).catch(e => this.spinner.hide())
	}

	onConfirm() {
		this.confirm.close()

		setTimeout(() => {
			this.alert.open("删除成功")
		}, 1000)
		console.log("23")
	}

}

