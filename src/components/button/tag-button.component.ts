 // <tag-button (click)="editUser(d)" [disable]="true" color="primary" class="mgr10" icon="icon-edit1"></tag-button>

import { Component, Input, Output, EventEmitter, OnChanges, SimpleChange, OnInit } from '@angular/core';

@Component({
	selector: 'tag-button',
	template: `
<span (click)="buttonClick($event)" class="tag-button {{color}} {{className}}" [ngClass]="{'disable':disable}"><i *ngIf="icon" class="{{icon}} iconfont"></i>
	<ng-content></ng-content>
</span>
	`
})

export class TagButtonComponent implements OnInit {

    @Output() onConfirm = new EventEmitter();
    @Output() onCancel = new EventEmitter();
    @Output() onClick = new EventEmitter();

    @Input() disable = false;
    @Input() color:string = "primary";
    @Input() colorIndex:number;
    @Input() icon:string = "";
    @Input() className:string = "";

    colordefaultArr = ["primary","blue","green","red","purple"]

	constructor(
	) {
		
	}

	ngOnInit() {
		if (this.colorIndex) this.color = this.colordefaultArr[(this.colorIndex + this.colordefaultArr.length) % this.colordefaultArr.length]
	}

	buttonClick($event) {
		if (this.disable) return false;

		this.onClick.emit($event)
	}


}

