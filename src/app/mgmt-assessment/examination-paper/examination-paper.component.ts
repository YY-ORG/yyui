import { Component,  OnInit, ViewEncapsulation, ChangeDetectorRef, ViewChild  } from '@angular/core';

import { INglDatatableSort, INglDatatableRowClick } from 'ng-lightning/ng-lightning';
import { SpinnerComponent } from '../../../components'
import { PageClass } from '../../../class/page/page.class'

import { Adminui, Assess } from '../../../core';

import { ExaminationPaperService } from './examination-paper.service'
import { WizardComponent } from 'ng2-archwizard'


@Component({
	selector: 'examination-paper',
	styleUrls: ["./examination-paper.scss"],
	templateUrl: "./examination-paper.template.html",
	encapsulation: ViewEncapsulation.None
})
export class ExaminationPaperComponent extends PageClass implements OnInit {
	@ViewChild(WizardComponent) public wizard: WizardComponent;

	constructor(
		private service: ExaminationPaperService,
		private cdr: ChangeDetectorRef
	) {
		super()
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
		this.getPaper()
	}

	getPaper () {
		this.service.fetchAssesspaperlist().then(res => {
			this.assesspaperlist = res
			setTimeout(() => {
				(document.querySelector('.slds-tabs--default__link') as HTMLElement).click()
				if (res.length) {
					this.getAssesslist(res[0])
				}
			})
		})
	}

	getAssesslist (paper: Assess.AssessPaperItem) {
		this.currentAssessPaper = paper
		this.service.fetchAssesslist(paper.id).then(res => {
			if (!res.length) {
				return
			}
			this.assesslist = res
			this.getItem(res[0])
			this.cdr.detectChanges()
			setTimeout(() => {
				// this.wizard.model.navigationMode.goToNextStep()
			}, 4000)
			
		})
	}

	goToStep (index: number) {
		console.log(this.templateItemList)
		let preFinalize = {
			emit: () => {
				this.getItem(this.assesslist[index])
			}
		}
		this.wizard.model.navigationMode.goToStep(index, preFinalize)
	}

	send (ddd) {
		console.log(ddd)
	}

	getItem(assesst: Assess.AssessMenuItem) {
		this.currentAssesst = assesst
		this.service.fetchExamination(assesst.assessId).then(res => {
			this.examination = res
			this.templateItemList = this.examination.templateItemList
			this.templateItemList.forEach(templateItem =>{
				templateItem.templateItemItemList.forEach(tem => {
					tem.reqDate = {
						code: tem.code,
						id: tem.id,
						name: tem.name,
						value: ""
					}
				})
			})
			console.log(this.templateItemList)
		})
	}
	
  onEditorBlured(quill) {
    console.log('editor blur!', quill);
  }

  onEditorFocused(quill) {
    console.log('editor focus!', quill);
  }

  onEditorCreated(quill) {
    this.editor = quill;
    console.log('quill is ready! this is current quill instance object', quill);
  }

  onContentChanged({ quill, html, text }) {
    console.log('quill content is changed!', quill, html, text);
	}
	
	onConfirm() {
		this.confirm.close()

		setTimeout(() => {
			this.alert.open("删除成功")
		}, 1000)
	}

}

