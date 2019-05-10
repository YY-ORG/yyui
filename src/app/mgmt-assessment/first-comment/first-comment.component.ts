import { Component,  OnInit, ViewEncapsulation  } from '@angular/core';

import { INglDatatableSort, INglDatatableRowClick } from 'ng-lightning/ng-lightning';
import { SpinnerComponent } from '../../../components'
import { PageClass } from '../../../class/page/page.class'
import { SystemDictionaryService, RestApiCfg, RestApi, Adminui, Assess, Common } from '../../../core';
import { FristCommentService } from './first-comment.service'

import { Router } from "@angular/router";

@Component({
	selector: 'first-comment',
	styleUrls: ["./first-comment.scss"],
	templateUrl: "./first-comment.template.html",
	encapsulation: ViewEncapsulation.None
})
export class FirstCommentComponent extends PageClass implements OnInit {
	constructor(
		private service: FristCommentService,
		private router: Router
	) {
		super()
	}

	willDeleteUser;
	editModalOpen: boolean = false;
	unmarklist: Assess.AssessPaperExamineeMapItem[] = []

	currentPage: number = 0
	maxPage: number = 1
	isFirstComment : boolean = false

	ngOnInit() {
		this.isFirstComment = this.router.url.indexOf('first-comment') > -1
		this.getUnmarkList()
	}

	gotoPaper (unmarklist: Assess.AssessPaperExamineeMapItem) {
		this.router.navigate([`mgmt-assessment/${this.isFirstComment ? 'first-comment' : 're-comment'}`, unmarklist.assessPaperId, unmarklist.userId]);

	}

	getUnmarkList () {
		this.spinner.show()
		const server = this.isFirstComment ? this.service.fetchUnmarklist : this.service.fetchUnauditlist
		server.bind(this.service)(this.currentPage, 10).then((res) => {
			this.spinner.hide()
			let [pageList, unmarklist] = res
			this.currentPage = pageList.totalPage === pageList.currentPage ? pageList.totalPage - 1 : pageList.currentPage
			this.maxPage = pageList.totalPage
			this.unmarklist = unmarklist
		}).catch(res => {
      this.spinner.hide()
      this.alert.open(res)
    })
	}
	
	deleteUser(d) {
		this.willDeleteUser = d;
		this.confirm.open("确定要删除此用户吗？")
	}

	editUser(d) {
		this.editModalOpen = true
	}

	pageChanged (pageEvent: any) {
		this.currentPage = pageEvent.currentpage - 1
		this.getUnmarkList()
	}

	onConfirm() {
		this.confirm.close()

		setTimeout(() => {
			this.alert.open("删除成功")
		}, 1000)
		console.log("23")
	}

}

