import { Component, ViewChild } from '@angular/core';
import { SpinnerComponent } from '../../components'

@Component({
	selector: 'page-class',
	styleUrls: ["./page.scss"]
})

export class PageClass {

	@ViewChild('spinner') spinner;

	constructor() {
		console.log(this.spinner)
	}

}

