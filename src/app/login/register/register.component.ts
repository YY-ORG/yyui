import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {
  Validation,
  ValidationRegs,
  SpinnerComponent,
  AlertComponent
} from '../../../components'

import {
  Adminui,
  Assess
} from '../../../core';
import {
  Router
} from "@angular/router";

import {
  RegisterService
} from "./register.service"

import { RegistrationComponent } from '../../components/registration/registration'

@Component({
  selector: 'register',
  templateUrl: "./register.template.html",
  styleUrls: ["./register.scss"],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {

  constructor(
    public v: Validation,
    private router: Router,
    public service: RegisterService
  ) {
    this.v.result = {}
  }

  @ViewChild('spinner') spinner: SpinnerComponent;
  @ViewChild('alert') alert: AlertComponent;
	@ViewChild(RegistrationComponent) public registration: RegistrationComponent;
	
  ngOnInit() {}

  submitForm() {
		this.registration.submitForm().then(res => {
      this.alert.open("注册成功!", () => {
        this.router.navigate([`login`]);
      });
		}).catch(error => {
			this.alert.open(error)
		})
  }
}
