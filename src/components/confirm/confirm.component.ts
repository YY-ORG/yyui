import { Component, Input, Output, EventEmitter, OnChanges, SimpleChange, OnInit } from '@angular/core';

@Component({
	selector: 'confirm',
	templateUrl: "./confirm.template.html",
	styleUrls: ["./confirm.scss"]
})

export class ConfirmComponent implements OnInit {

    @Output() onConfirm = new EventEmitter();
    @Output() onCancel = new EventEmitter();

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
		this.onCancel.emit()
	}

	confirm() {
		this.onConfirm.emit()
	}

}

