import { Component,  OnInit, ViewEncapsulation  } from '@angular/core';

import { INglDatatableSort, INglDatatableRowClick } from 'ng-lightning/ng-lightning';
import { Validation, ValidationRegs, SpinnerComponent } from '../../../components'
import { PageClass } from '../../../class/page/page.class'
import { SystemDictionaryService, RestApiCfg, RestApi, Adminui, Assess, Common } from '../../../core';
import { SetScoringCategoryService } from './set-scoring-category.service'
import { Router, ActivatedRoute } from "@angular/router";

@Component({
	selector: 'set-scoring-category',
	styleUrls: ["./set-scoring-category.scss"],
	templateUrl: "./set-scoring-category.template.html",
	encapsulation: ViewEncapsulation.None
})
export class SetScoringCategoryComponent extends PageClass implements OnInit {
	constructor(
		private route: ActivatedRoute,
    public v: Validation,
		private service: SetScoringCategoryService,
		private router: Router
	) {
		super()
    this.v.result = {}
	}

	scoringList: Assess.ApAcScoringItem[] = []
	private sub: any;

	currentPage: number = 0
	maxPage: number = 1
	paperid: string;

	ngOnInit() {
		// paperid/:userid
		this.sub = this.route.params.subscribe(params => {
			this.paperid = params.paperid
			this.getScoringList()
		});
	}
	
	getScoringList () {
		this.spinner.show()
		this.service.fetPaperScoring(this.paperid).then((res) => {
			this.spinner.hide()
			this.scoringList = res
			console.log(this.scoringList)
		}).catch(res => {
      this.spinner.hide()
      this.alert.open(res)
    })
	}

	checkRatio (value: number) {
		return this.v.isNumber(value) && this.v.min(0) && this.v.max(100)
	}

	checkThreshold (value: number) {
		return this.v.isNumber(value) && this.v.min(0)
	}

  checkValue(key ? : string) {
    let regs: ValidationRegs = {
    }

    return this.v.check(key, regs);
  }
	pageChanged (pageEvent: any) {
		this.currentPage = pageEvent.currentpage - 1
		this.getScoringList()
	}

}

