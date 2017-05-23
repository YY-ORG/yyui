import { Component, ViewChild, OnInit } from '@angular/core';
import { SpinnerComponent, AlertComponent, ConfirmComponent } from '../../components'

const DATA = [
	{ rank: 1, name: 'Kareem', surname: 'Abdul-Jabbar', points: 38387 },
	{ rank: 2, name: 'Karl', surname: 'Malone', points: 36928 },
	{ rank: 3, name: 'Kobe', surname: 'Bryant', points: 33643 },
	{ rank: 4, name: 'Michael', surname: 'Jordan', points: 32292 },
	{ rank: 5, name: 'Wilt', surname: 'Chamberlain', points: 31419 },
	{ rank: 1, name: 'Kareem', surname: 'Abdul-Jabbar', points: 38387 },
	{ rank: 2, name: 'Karl', surname: 'Malone', points: 36928 },
	{ rank: 3, name: 'Kobe', surname: 'Bryant', points: 33643 },
	{ rank: 4, name: 'Michael', surname: 'Jordan', points: 32292 },
	{ rank: 5, name: 'Wilt', surname: 'Chamberlain', points: 31419 },
];

@Component({
	selector: 'page-class',
	template: `
		<spinner #spinner></spinner>
		<alert #alert></alert>
		<confirm #confirm></confirm>
	  `
})

export class PageClass {

	@ViewChild('spinner') spinner: SpinnerComponent;
	@ViewChild('alert') alert: AlertComponent;
	@ViewChild('confirm') confirm: ConfirmComponent;

	datas = DATA

	constructor() {
	}

}

