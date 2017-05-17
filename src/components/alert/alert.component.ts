import { Component, Input, Output, EventEmitter, OnChanges, SimpleChange, OnInit } from '@angular/core';

@Component({
	selector: 'alert',
	templateUrl: "./alert.template.html",
	styleUrls: ["./alert.scss"]
})

export class AlertComponent implements OnInit {

	type: string = null;
	size: string = 'medium';

	isShow: boolean = false;
	counter: number = 0;

	message: string;
	title: string;

	constructor(
	) {
		
	}

	ngOnInit() {
	}

	open(message, title="提示") {
		this.message = message
		this.title = title
		this.isShow = true
	}

	close() {
		this.isShow = false
	}

}

