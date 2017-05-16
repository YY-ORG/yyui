import { Component, Input, Output, EventEmitter, OnChanges, SimpleChange, OnInit, Injectable } from '@angular/core';

@Component({
	selector: 'spinner',
	templateUrl: "./spinner.template.html",
	styleUrls: ["./spinner.scss"]
})

export class SpinnerComponent implements OnInit {

	type: string = null;
	size: string = 'medium';

	constructor(
	) {
		
	}

	ngOnInit() {

	}

}

