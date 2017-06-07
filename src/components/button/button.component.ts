 // <my-button (click)="editUser(d)" [disable]="true" color="primary" class="mgr10" icon="icon-edit1"></my-button>

import { Component, Input, Output, EventEmitter, OnChanges, SimpleChange, OnInit } from '@angular/core';

@Component({
	selector: 'my-button',
	templateUrl: "./button.template.html",
})

export class ButtonComponent implements OnInit {

    @Output() onConfirm = new EventEmitter();
    @Output() onCancel = new EventEmitter();
    @Output() onClick = new EventEmitter();

    @Input() disable = false;
    @Input() color:"primary"|"red"|"purple" = "primary";
    @Input() icon:string = "";
    @Input() className:string = "";

	constructor(
	) {
		
	}

	ngOnInit() {
	}

	buttonClick($event) {
		if (this.disable) return false;

		this.onClick.emit($event)
	}


}

