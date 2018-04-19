import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StudentHomePage } from '../student-home/student-home';
import { ViewQRCodePage } from '../view-qrcode/view-qrcode';
import { SignupPage } from '../signup/signup';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController) {
  }
  goToStudentHome(params){
    if (!params) params = {};
    this.navCtrl.push(StudentHomePage);
  }goToViewQRCode(params){
    if (!params) params = {};
    this.navCtrl.push(ViewQRCodePage);
  }goToSignup(params){
    if (!params) params = {};
    this.navCtrl.push(SignupPage);
  }goToForgotPassword(params){
    if (!params) params = {};
    this.navCtrl.push(ForgotPasswordPage);
  }
}
