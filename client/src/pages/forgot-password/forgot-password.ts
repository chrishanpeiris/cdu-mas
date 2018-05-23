import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";

@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html'
})
export class ForgotPasswordPage {

  public email:string;
  public authresponse: any;
  public autherrors: any;
  constructor(public navCtrl: NavController, public authProvider:AuthProvider) {
  }


  sendEmail(){

    this.authProvider.resetPassword(this.email).then((result) => {
      this.authresponse = result;
      console.log("student reset password")
      console.log(this.authresponse);
      return true;
    }, (err) => {
      this.autherrors = err;
      if (err.statusText = "Unauthorized") {
        return false;
      }
      console.log(this.autherrors);
      return false;
    });

  }



}
