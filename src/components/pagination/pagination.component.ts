import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { NgModel}  from "@angular/forms";
//import {NgIf, NgFor, NgClass} from "@angular/common";

@Component({
	selector: 'pagination',
	templateUrl: './pagination.template.html',
	styleUrls: ['./pagination.scss']
})
export class PaginationComponent implements OnInit {
	@Input("currentPage") currentpage: number;
	@Input("maxSize") pageSize: number;
	@Output("pageChanged") pageChanged = new EventEmitter();
	pageList: Array<number> = [];
	private onChange: Function;
	private onTouched: Function;
	private seletedPage: number;
	private nextItem: number;
	private previousItem: number;
	private nextItemValid: boolean;
	private previousItemValid: boolean;

	constructor() {

	}
	ngOnInit() {
		this.doPaging();
	}
	doPaging() {
		this.pageList = [];
		var i: number, count: number;

		let maxNum = 6,
			totalSize = this.pageSize > maxNum ? maxNum : this.pageSize,
			minPage = this.pageSize < maxNum ? 1 : this.pageSize - this.currentpage < maxNum - 1 ? this.pageSize - maxNum + 1 : this.currentpage - 1 < 1 ? 1 : this.currentpage - 1

		for (i = minPage, count = 0; i <= this.pageSize && count < totalSize; i++ , count++) {
			this.pageList.push(i);
		}

		if( minPage >= 3 ) this.pageList = [1,-1].concat(this.pageList)
		if( this.pageSize - this.currentpage + 1 > maxNum ) this.pageList = this.pageList.concat([-1, +this.pageSize])

		console.log(minPage, this.pageSize - this.currentpage , this.pageList)
		//next validation
		if (i - 1 < totalSize) {
			this.nextItemValid = true;
			this.nextItem = i;
		} else {
			this.nextItemValid = false;
		}
		//previous validation
		if ((this.currentpage) > 1) {
			this.previousItemValid = true;
			this.previousItem = (this.currentpage * this.pageSize) - 1;
		} else {
			this.previousItemValid = false;
		}
	}
	setCurrentPage(pageNo: number) {
		this.seletedPage = pageNo;
		this.pageChageListner();
	}
	firstPage() {
		this.currentpage = 1;
		this.pageChageListner();
		this.doPaging()
	}
	lastPage() {
		var totalPages = this.pageSize;
		var lastPage = (totalPages) - (totalPages % this.pageSize === 0 ? this.pageSize : totalPages % this.pageSize) + 1;
		this.currentpage = lastPage;
		this.pageChageListner();
		this.doPaging()
	}
	nextPage(pageNo: number) {
		this.currentpage = pageNo;
		this.pageChageListner();
		this.doPaging()
	}
	previousPage(pageNo: number) {
		var temp = pageNo - this.pageSize;
		this.currentpage = temp > 0 ? temp : 1;
		this.pageChageListner();
		this.doPaging();
	}
	writeValue(value: string): void {
		if (!value && value != '0') return;
		this.setValue(value);
	}

	registerOnChange(fn: (_: any) => {}): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: (_: any) => {}): void {
		this.onTouched = fn;
	}
	setValue(currentValue: any) {
		this.currentpage = currentValue;
		this.doPaging();
	}
	pageChageListner() {
		this.pageChanged.emit({
			itemsPerPage: this.currentpage
		})
	}
}