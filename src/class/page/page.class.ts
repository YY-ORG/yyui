import { Component, ViewChild, OnInit } from '@angular/core';
import { SpinnerComponent, AlertComponent } from '../../components'

@Component({
	selector: 'page-class',
	template: `
		<spinner #spinner></spinner>
		<alert #alert></alert>
	  `
})

export class PageClass {

	@ViewChild('spinner') spinner: SpinnerComponent;
	@ViewChild('alert') alert: AlertComponent;

	constructor() {
	}

}

