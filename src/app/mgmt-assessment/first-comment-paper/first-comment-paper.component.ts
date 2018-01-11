import { Component,  OnInit, ViewEncapsulation  } from '@angular/core';

import { INglDatatableSort, INglDatatableRowClick } from 'ng-lightning/ng-lightning';
import { SpinnerComponent } from '../../../components'
import { PageClass } from '../../../class/page/page.class'
import { SystemDictionaryService, RestApiCfg, RestApi, Adminui, Assess, Common } from '../../../core';
import { FirstCommentPaperService } from './first-comment-paper.service'
import { Router, ActivatedRoute } from "@angular/router";

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
        private router: Router
	) {
		super()
	}

	willDeleteUser;
	editModalOpen: boolean = false;
	groupAnswerItemList: Assess.SimpleAssessGroupAnswerItem[] = []

	currentPage: number = 0
	maxPage: number = 1
	paperStatus: number = 1; // 试卷状态

	private sub: any;
	paperid: string;
	userid: string;

	ngOnInit() {
		// paperid/:userid
		this.sub = this.route.params.subscribe(params => {
			this.paperid = params.paperid
			this.userid = params.userid
		});
		this.getAssessanswerlist()
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
			console.log(res)
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

