import {Component, Input, Output,EventEmitter,OnChanges,SimpleChange,OnInit} from '@angular/core';

@Component({
    selector: 'login',
    templateUrl: "./login.template.html",
    styleUrls: ["./login.scss"]
})
export class LoginComponent implements OnInit{
    constructor() {
        
    }
    checked = false;
      indeterminate = false;
      align = 'start';
      disabled = false;
    ngOnInit (){

    }  
}

