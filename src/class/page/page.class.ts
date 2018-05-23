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
	hasError: boolean = false
	error: string = ""
	required: string = ""
	days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
	myDatePickerOptions = {}

	constructor() {
	}

	pageChanged($event){}
	onDateChanged($event){}
	onConfirm(){}

	printElem (elem: HTMLElement) {
		var mywindow = window.open('', 'PRINT', 'height=400,width=600');
		
		mywindow.document.write('<html><head><title>' + document.title  + '</title>');
		mywindow.document.write(`
		<style>
		  * {
				margin: 0;
				padding: 0;
				list-style: none;
			}
			table {
				width: 100%;
				margin: 10px 0 30px;
				border-collapse: collapse;
			}
			table th, table td {
				border:1px solid #000;
				padding: .2em 0.5em;
				text-align: center;
			}
		</style>
		`)
    mywindow.document.write('</head><body >');
    mywindow.document.write(elem.innerHTML);
    mywindow.document.write('</body></html>');

    // mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    mywindow.close();

    return true;
	}

}

