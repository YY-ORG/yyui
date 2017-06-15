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
	fun: Function;

	constructor(
	) {
		
	}

	ngOnInit() {
	}

	open(message, fun?, title="提示") {
		this.message = message
		this.title = title
		this.isShow = true

		this.fun = fun
	}

	close() {
		this.isShow = false

		this.fun && this.fun();
		this.fun = undefined
	}

}

