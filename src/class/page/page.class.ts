import { Component, ViewChild, OnInit } from '@angular/core';
import { SpinnerComponent, AlertComponent, ConfirmComponent } from '../../components'

const DATA = [
	{ rank: 1, name: 'Kareem', isAny: true , surname: 'Abdul-Jabbar', points: 38387 },
	{ rank: 2, name: 'Karl', isAny: true , surname: 'Malone', points: 36928 },
	{ rank: 3, name: 'Kobe', isAny: false , surname: 'Bryant', points: 33643 },
	{ rank: 4, name: 'Michael', isAny: true , surname: 'Jordan', points: 32292 },
	{ rank: 5, name: 'Wilt', isAny: true , surname: 'Chamberlain', points: 31419 },
	{ rank: 1, name: 'Kareem', isAny: false , surname: 'Abdul-Jabbar', points: 38387 },
	{ rank: 2, name: 'Karl', isAny: false , surname: 'Malone', points: 36928 },
	{ rank: 3, name: 'Kobe', isAny: false , surname: 'Bryant', points: 33643 },
	{ rank: 4, name: 'Michael', isAny: true , surname: 'Jordan', points: 32292 },
	{ rank: 5, name: 'Wilt', isAny: true , surname: 'Chamberlain', points: 31419 },
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

