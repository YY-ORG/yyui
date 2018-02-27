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
  currentScoring: Assess.ApAcScoringItem = new Assess.ApAcScoringItem
  cgScoringList: Assess.ApAssessScoringItem[] = []
  private sub: any;

  currentPage: number = 0
  maxPage: number = 1
  paperid: string
  setModalOpen: boolean = false

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
      this.scoringList = res.map(r => {
        return {
          ...r,
          ratio: r.ratio * 100,
          ratioError: '',
          thresholdError: ''
        }
      })
    }).catch(res => {
      this.spinner.hide()
      this.alert.open(res)
    })
  }
  
  getCgScoringList (categoryID: string) {
    this.spinner.show()
    this.service.fetCategoryScoring(this.paperid, categoryID, this.currentPage, 10).then((res) => {
      this.spinner.hide()
      let [pageList, cgScoringList] = res
      this.currentPage = pageList.totalPage === pageList.currentPage ? pageList.totalPage - 1 : pageList.currentPage
      this.maxPage = pageList.totalPage

      this.cgScoringList = cgScoringList.map(r => {
        return {
          ...r,
          ratio: r.ratio * 100,
          ratioError: '',
          thresholdError: '',
          itemThresholdError: ''
        }
      })
      console.log(this.cgScoringList)
    }).catch(res => {
      this.spinner.hide()
      this.alert.open(res)
    })
  }

  checkRatio (value: number, scoring: Assess.ApAcScoringItem) {
    scoring.ratioError = this.v.isUnBlank(value) && this.v.isNumber(value) && this.v.min(10e-10)(value) && this.v.max(100)(value) ? '' : '计分比填写不正确'
  }

  checkThreshold (value: number, scoring: Assess.ApAcScoringItem) {
    scoring.thresholdError = this.v.isUnBlank(value) && this.v.isNumber(value) && this.v.min(0)(value) ? '' : '分值范围填写不正确'
  }

  checkItemThreshold (value: number, scoring: Assess.ApAssessScoringItem) {
    scoring.itemThresholdError = this.v.isUnBlank(value) && this.v.isNumber(value) && this.v.min(0)(value) ? '' : '单个答案分值范围填写不正确'
  }
  
  submiteScoring () {
    for (let index = 0; index < this.scoringList.length; index++) {
      const scoring = this.scoringList[index];
      if (scoring.ratioError) return this.alert.open(scoring.ratioError)
      if (scoring.thresholdError) return this.alert.open(scoring.thresholdError)
    }

    this.spinner.show()
    let data: Assess.ApAcScoringReq[] = this.scoringList.map(scoring => {
      return {
        apacId: scoring.apAcId,
        id: scoring.id,
        ratio: scoring.ratio / 100,
        threshold: +scoring.threshold
      }
    })
    this.service.postPaperScoring(this.paperid, data).then(res => {
      this.spinner.hide()
      this.alert.open('提交成功')
      this.getScoringList()
    }).catch(res => {
      this.spinner.hide()
      this.alert.open(res)
    })
  }

  submiteCgScoring () {
    for (let index = 0; index < this.cgScoringList.length; index++) {
      const scoring = this.cgScoringList[index];
      if (scoring.ratioError) return this.alert.open(scoring.ratioError)
      if (scoring.thresholdError) return this.alert.open(scoring.thresholdError)
      if (scoring.itemThresholdError) return this.alert.open(scoring.itemThresholdError)
    }

    this.spinner.show()
    let data: Assess.ApAssessScoringReq[] = this.cgScoringList.map(scoring => {
    	return {
        apAssessId: scoring.apAssessId,
    		assessId: scoring.id,
    		ratio: scoring.ratio / 100,
        itemThreshold: +scoring.itemThreshold,
    		threshold: +scoring.threshold
    	}
    })
    this.service.postCategoryScoring(this.paperid, this.currentScoring.id, data).then(res => {
    	this.spinner.hide()
    	this.alert.open('提交成功')
    	this.getCgScoringList(this.currentScoring.id)
    }).catch(res => {
      this.spinner.hide()
      this.alert.open(res)
    })
  }

  pageChanged (pageEvent: any) {
    this.currentPage = pageEvent.currentpage - 1
    this.getScoringList()
  }

  openCategory (scoring: Assess.ApAcScoringItem) {
    this.currentScoring = scoring
    this.setModalOpen = true
    this.getCgScoringList(scoring.id)
  }

}

