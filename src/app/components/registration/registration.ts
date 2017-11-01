import {
  Component, Input, Output, EventEmitter, OnInit, ViewChild, ViewEncapsulation
} from '@angular/core';
import {
  Validation, ValidationRegs, SpinnerComponent, AlertComponent
} from '../../../components'

import {
  Adminui, Assess
} from '../../../core';
import {
  Router
} from "@angular/router";

import {
  RegistrationService
} from "./registration.service"

@Component({
  selector: 'registration',
  templateUrl: "./registration.template.html",
  styleUrls: ["./registration.scss"],
  encapsulation: ViewEncapsulation.None
})
export class RegistrationComponent implements OnInit {

  constructor(
    public v: Validation,
    private router: Router,
    public service: RegistrationService
  ) {
    this.v.result = {}
  }

  @ViewChild('spinner') spinner: SpinnerComponent;
  @ViewChild('alert') alert: AlertComponent;

  userProfile: Adminui.UserProfile = new Adminui.UserProfile;
  checkPassword: string;
  organizationList: Adminui.OrganizationItem[] = []

  ngOnInit() {
    this.fetchOrganizations();
  }

  private fetchOrganizations() {
    this.service.fetchOrganizations().then(res => {
      this.organizationList = res;
    })
  }

  checkValue(key ? : string) {
    const regs: ValidationRegs = {
      username: [this.userProfile.loginName, [this.v.isUnBlank, this.v.isInstanceName, this.v.lengthRange(2, 16)], "请输入2-16位大小写字母数字组合"],
      password: [this.userProfile.password, [this.v.isUnBlank, this.v.isPassword], "请输入大小写字母数字特殊字符组合"],
      checkPassword: [this.checkPassword, [this.v.isUnBlank, this.v.equalTo(this.userProfile.password)], "两次密码输入不一致"],
      email: [this.userProfile.email, [this.v.isUnBlank, this.v.isEmail], "email格式不正确"],
      name: [this.userProfile.userName, [this.v.isUnBlank, this.v.isBase], "姓名输入不正确"],
      gender: [this.userProfile.gender, [this.v.isUnBlank], "请选择性别"],
      phone: [this.userProfile.phone, [this.v.isUnBlank, this.v.isMoblie], "手机号格式不正确"],
      birthday: [this.userProfile.birthday, [this.v.isUnBlank, this.v.isBase], "请填写正确的出生日期"],
      occupationType: [this.userProfile.occupationType, [this.v.isUnBlank], "请选择岗位系列"],
      professionalTitle: [this.userProfile.professionalTitle, [this.v.isUnBlank], "请选择职称"],
      administrativeRank: [this.userProfile.administrativeRank, [this.v.isUnBlank], "请选择行政级别"],
      administrativePost: [this.userProfile.administrativePost, [this.v.isUnBlank], "请选择行政职务"],
      orgId: [this.userProfile.orgId, [this.v.isUnBlank], "请选择部门"],
    }

    return this.v.check(key, regs);
  }


  submitForm(): Promise<string> {
    let errorMessage = this.checkValue()

    if (errorMessage) return Promise.reject(errorMessage)

    this.spinner.show()
    return this.service.submitRegister(this.userProfile).then(res => {
      this.spinner.hide()
      return res;
    })
  }

  onDateChanged(event) {
    this.userProfile.birthday = event.formatted
  }
}
