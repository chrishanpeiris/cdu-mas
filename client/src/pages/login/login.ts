import { Component } from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import {TabsStudentPage} from '../tabs-student/tabs-student';
import {TabsLecturePage} from '../tabs-lecture/tabs-lecture'
import { ViewQRCodePage } from '../view-qrcode/view-qrcode';
import { SignupPage } from '../signup/signup';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';
import {AuthProvider} from "../../providers/auth/auth";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  user = {email: '', password: ''};
  authresponse: any;
  autherrors: any;
  errormessage: any;
  getAuthUser:any;
  logUserType: any;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public AuthProvider: AuthProvider) {
  }
  goToStudentHome(params){

    this.AuthProvider.userLogin(this.user).then((result) => {
      this.authresponse = result;
      console.log(this.authresponse.access_token);
      if (this.authresponse != null) {
        this.AuthProvider.storeToken(this.authresponse.access_token);

        this.userAuthentication();
      }
    }, (err) => {
      this.autherrors = err;

      if (err.statusText = "Unauthorized") {
        this.showLoginAlert();
        console.log(this.errormessage);
      }
      console.log(this.autherrors);
    });
  }
  goToViewQRCode(params){
    if (!params) params = {};
    this.navCtrl.push(ViewQRCodePage);
  }
  goToSignup(params){
    if (!params) params = {};
    this.navCtrl.push(SignupPage);
  }
  goToForgotPassword(params){
    if (!params) params = {};
    this.navCtrl.push(ForgotPasswordPage);
  }

  showLoginAlert() {
    let alert = this.alertCtrl.create({
      title: 'Oops! Login failed!',
      subTitle: 'Incorrect username or password, Please check and try again',
      buttons: ['OK']
    });
    alert.present();
  }

  userAuthentication(){
    this.AuthProvider.getUser()
      .then(data =>{
        this.getAuthUser=data;
        console.log(this.getAuthUser.type);
// this.logUserType=this.getAuthUser.type;

        if(this.getAuthUser.type)
        {
          this.navCtrl.push(TabsLecturePage);
        }else
        {
          this.navCtrl.push(TabsStudentPage);
        }
      });




  }

}
