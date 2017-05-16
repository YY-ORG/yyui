import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from "@angular/core";
import { NgModel}  from "@angular/forms";
//import {NgIf, NgFor, NgClass} from "@angular/common";

@Component({
	selector: 'pagination',
	templateUrl: './pagination.template.html',
	styleUrls: ['./pagination.scss']
})
export class PaginationComponent implements OnInit,OnChanges {
	@Input("currentPage") currentpage: number;
	@Input("maxSize") pageSize: number;
	@Input("maxNum") maxNum : number = 6;
	@Input("reserveNum") reserveNum : number = 1;
	@Output("pageChanged") pageChanged = new EventEmitter();
	pageList: Array<number> = [];

	minPage:number = 1;
	isMaxPage: boolean; //当前页面是否在最后一排页面里

	constructor() {

	}
	ngOnInit() {
		this.doPaging();
	}
	ngOnChanges() {
		this.doPaging();
	}
	doPaging() {
		this.pageList = [];
		var i: number, count: number;

		let	totalSize = this.pageSize > this.maxNum ? this.maxNum : this.pageSize;
		this.isMaxPage = this.pageSize - this.currentpage < this.maxNum - this.reserveNum
		this.minPage = this.pageSize < this.maxNum ? 1 : this.isMaxPage ? this.pageSize - this.maxNum + this.reserveNum : this.currentpage - this.reserveNum < 1 ? 1 : this.currentpage - this.reserveNum

		for (i = this.minPage, count = 0; i <= this.pageSize && count < totalSize; i++ , count++) {
			this.pageList.push(i);
		}
		if( this.minPage >= 3 ) this.pageList = [1,-1].concat(this.pageList)
		if( !this.isMaxPage ) this.pageList = this.pageList.concat([-1, +this.pageSize])
	}
	
	nextPage(pageNo: number) {
		this.goToPage(this.currentpage+1);
	}
	previousPage(pageNo: number) {
		this.goToPage(this.currentpage-1);
	}

	goToPage(pageNo: number) {
		if( pageNo > this.pageSize || pageNo < 1 || pageNo == this.currentpage) return false

		this.currentpage = pageNo
		this.pageChageListner();
		this.doPaging();
	}
	
	pageChageListner() {
		this.pageChanged.emit({
			currentpage: this.currentpage
		})
	}
}