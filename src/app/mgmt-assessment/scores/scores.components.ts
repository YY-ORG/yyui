import { Component,  OnInit, ViewEncapsulation  } from '@angular/core';

import { INglDatatableSort, INglDatatableRowClick } from 'ng-lightning/ng-lightning';
import {
  Validation, ValidationRegs, SpinnerComponent, AlertComponent
} from '../../../components'
import { PageClass } from '../../../class/page/page.class'

import {
	Router
  } from "@angular/router";


  import {
	Adminui, Assess
  } from '../../../core';
import {
 ScoresService
} from "./scores.service"

@Component({
	selector: 'scores',
	styleUrls: ["./scores.scss"],
	templateUrl: "./scores.template.html",
	encapsulation: ViewEncapsulation.None
})
export class ScoresComponent extends PageClass implements OnInit {
	constructor(
	  public v: Validation,
	  private router: Router,
	  public service: ScoresService
	) {
		super()
	  this.v.result = {}
	}
	

	assessPaperId: string = ''
	orgId: string = ''
	title: string = ''
	currentPage: number = 0
	maxPage: number = 1
	pageList: Assess.SimpleAssessPaperItem[] = []

	organizationList: Adminui.OrganizationItem[] = []
	rankingList: any[] = []
	currentRanking: any = {}

	scoresDetail: boolean = false
	ngOnInit() {
		this.fetchOrganizations();
		this.fetchPaperList()
	}

	private fetchPaperList () {
		this.service.fetAssesspaperlist().then(res => {
			this.pageList = res[1]
		})
	}

	private fetchOrganizations() {
		this.service.fetchOrganizations().then(res => {
		  this.organizationList = res;
		})
	}

	private fetchRankingList () {
		this.spinner.show()
		this.service.fetchRanking(this.assessPaperId, this.orgId, this.title, this.currentPage, 10).then((res) => {
			this.spinner.hide()
			let [pageList, rankingList] = res
			this.currentPage = pageList.totalPage === pageList.currentPage ? pageList.totalPage - 1 : pageList.currentPage
			this.maxPage = pageList.totalPage
			this.rankingList = rankingList
		}).catch(res => {
      this.spinner.hide()
      this.alert.open(res)
    })
	}

	pageChanged (pageEvent: any) {
		this.currentPage = pageEvent.currentpage - 1
		this.fetchRankingList()
	}

  checkValue(key ? : string) {
    let regs: ValidationRegs = {
    }

    return this.v.check(key, regs);
	}
	
	moreInfo (ranking: any) {
		this.currentRanking = ranking
		this.scoresDetail = true
		this.spinner.show()
		this.service.fetchRankingDetail(this.assessPaperId, this.currentRanking.userId).then(res => {
			this.spinner.hide()
			console.log(res)
		}).catch(res => {
      this.spinner.hide()
      this.alert.open(res)
    })
	}

	onConfirm() {
	}

}

