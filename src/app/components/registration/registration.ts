import {
  Component, Input, Output, EventEmitter, OnInit, ViewChild, ViewEncapsulation, OnChanges
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

import { MyDatePicker } from '../../../components/date-picker/my-date-picker.component'

@Component({
  selector: 'registration',
  templateUrl: "./registration.template.html",
  styleUrls: ["./registration.scss"],
  encapsulation: ViewEncapsulation.None
})
export class RegistrationComponent implements OnInit, OnChanges {

  constructor(
    public v: Validation,
    private router: Router,
    public service: RegistrationService
  ) {
    this.v.result = {}
  }
  
  @Input() isShowSelect:boolean = true;
  @Input() userProfile: Adminui.UserProfile;
  @Input() isDisable: boolean = false;
  @Input() isCanEditPassword: boolean = false;
  @ViewChild('spinner') spinner: SpinnerComponent;
  @ViewChild('alert') alert: AlertComponent;
  @ViewChild('dataPicker') dataPicker: MyDatePicker;
  
  checkPassword: string;
  organizationList: Adminui.OrganizationItem[] = []
  isEdit: boolean = true;
  editpasswordvalue: string = '!Qaz2wsx'

  ngOnInit() {
    if (!this.userProfile) {
      this.userProfile = new Adminui.UserProfile
      this.isEdit = false
    }
    this.fetchOrganizations();
  }

  ngOnChanges (arg) {
    if (!this.userProfile) {
      this.userProfile = new Adminui.UserProfile
      this.isEdit = false
    }
    this.dataPicker.setInitDate(this.userProfile.birthday)
  }

  private fetchOrganizations() {
    this.service.fetchOrganizations().then(res => {
      this.organizationList = res;
    })
  }

  checkValue(key ? : string) {
    let regs: ValidationRegs = {
      username: [this.userProfile.loginName, [this.v.isUnBlank, this.v.isInstanceName, this.v.lengthRange(2, 16)], "请输入2-16位大小写字母数字组合"],
      password: [this.userProfile.password, [this.v.isUnBlank, this.v.isPassword, this.v.lengthRange(8, 20)], "请输入8-20位大小写字母数字特殊字符组合"],
      checkPassword: [this.checkPassword, [this.v.isUnBlank, this.v.equalTo(this.userProfile.password)], "两次密码输入不一致"],
      email: [this.userProfile.email, [this.v.isUnBlank, this.v.isEmail], "email格式不正确"],
      name: [this.userProfile.userName, [this.v.isUnBlank, this.v.isBase], "姓名输入不正确"],
      gender: [this.userProfile.gender, [this.v.isUnBlank], "请选择性别"],
      phone: [this.userProfile.phone, [this.v.isUnBlank, this.v.isMoblie], "手机号格式不正确"],
      birthday: [this.userProfile.birthday, [this.v.isUnBlank, this.v.isBase], "请填写正确的出生日期"]
    }


    if (this.isShowSelect) {
      regs = {
        ...regs,
        occupationType: [this.userProfile.occupationType, [this.v.isUnBlank], "请选择岗位系列"],
        professionalTitle: [this.userProfile.professionalTitle, [this.v.isUnBlank], "请选择职称"],
        administrativeRank: [this.userProfile.administrativeRank, [this.v.isUnBlank], "请选择行政级别"],
        administrativePost: [this.userProfile.administrativePost, [this.v.isUnBlank], "请选择行政职务"],
        orgId: [this.userProfile.orgId, [this.v.isUnBlank], "请选择部门"]
      }
    }

    console.log(1233, [this.userProfile.password, [this.v.isUnBlank, this.v.isPassword, this.v.lengthRange(8, 20)], "请输入8-20位大小写字母数字特殊字符组合"])

    return this.v.check(key, regs);
  }

  editpassword () {
    this.userProfile.password = this.editpasswordvalue
  }

  getPassword () {
    return this.editpasswordvalue === '!Qaz2wsx' ? null : this.editpasswordvalue
  }


  submitForm() {
    let errorMessage = this.checkValue()

    if (errorMessage) return Promise.reject(errorMessage)

    this.spinner.show()
    // this.userProfile.password = encodeURIComponent(this.userProfile.password)
    return this.service.submitRegister(this.userProfile).then(res => {
      this.spinner.hide()
      return res
    }).catch(error => {
      this.spinner.hide()
      this.alert.open(error)
      throw error
		})
  }


  onDateChanged(event) {
    this.userProfile.birthday = event.formatted
  }
}
