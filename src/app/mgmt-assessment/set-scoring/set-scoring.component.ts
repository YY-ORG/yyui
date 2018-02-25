import { Component,  OnInit, ViewEncapsulation  } from '@angular/core';

import { INglDatatableSort, INglDatatableRowClick } from 'ng-lightning/ng-lightning';
import { SpinnerComponent } from '../../../components'
import { PageClass } from '../../../class/page/page.class'
import { SystemDictionaryService, RestApiCfg, RestApi, Adminui, Assess, Common } from '../../../core';
import { SetScoringService } from './set-scoring.service'

import { Router } from "@angular/router";

@Component({
	selector: 'set-scoring',
	styleUrls: ["./set-scoring.scss"],
	templateUrl: "./set-scoring.template.html",
	encapsulation: ViewEncapsulation.None
})
export class SetScoringComponent extends PageClass implements OnInit {
	constructor(
		private service: SetScoringService,
		private router: Router
	) {
		super()
	}

	assesspaperList: Assess.SimpleAssessPaperItem[] = []

	currentPage: number = 0
	maxPage: number = 1

	ngOnInit() {
		this.getPaperList()
	}
	
	getPaperList () {
		this.spinner.show()
		this.service.fetAssesspaperlist(this.currentPage, 10).then((res) => {
			this.spinner.hide()
			let [pageList, assesspaperList] = res
			this.currentPage = pageList.totalPage === pageList.currentPage ? pageList.totalPage - 1 : pageList.currentPage
			this.maxPage = pageList.totalPage
			this.assesspaperList = assesspaperList
		}).catch(res => {
      this.spinner.hide()
      this.alert.open(res)
    })
	}

	gotoPaper (assesspaper: Assess.SimpleAssessPaperItem) {
		console.log(assesspaper)
		this.router.navigate(['mgmt-assessment/scoring', assesspaper.id]);
	}

	pageChanged (pageEvent: any) {
		this.currentPage = pageEvent.currentpage - 1
		this.getPaperList()
	}

}

