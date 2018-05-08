import { Component } from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";
import {StudentHomePage} from "../student-home/student-home";
import {LoginPage} from "../login/login";

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

 public type : boolean=false;
 public spinner : boolean=false;


  typeValue()
  {
    console.log(this.type);
    if(this.type)
    {
      this.user.type=1;
    }
    else {

      this.user.type=0;
    }
  }

  user = {email: '',name:'', password: '',student_id:'',mobile:'',type:0 ,device:'',_token:''};


  authresponse: any;
  autherrors: any;
  errormessage="User Registration Failed";
  constructor(public navCtrl: NavController,public alertCtrl: AlertController, public AuthProvider: AuthProvider) {
    console.log("User Registration ");
    this.typeValue();

  }

  registerUser(params){
    this.spinner = true;
    this.AuthProvider.userRegistration(this.user).then((result) => {
      this.authresponse = result;
      if (this.authresponse != null) {
        this.spinner = false;
        this.showRegistrationSuccessAlert();
        this.navCtrl.push(LoginPage);
      }
    }, (err) => {
      this.autherrors = err;

      if (err.statusText = "Unauthorized") {
        this.spinner = false;
        this.showRegistrationFaildAlert();
        console.log(this.errormessage);
      }
      console.log(this.autherrors);
    });
  }

  showRegistrationFaildAlert() {
    let alert = this.alertCtrl.create({
      title: 'Oops! Registration failed!',
      subTitle: 'Please check the information and try it again',
      buttons: ['OK']
    });
    alert.present();
  }showRegistrationSuccessAlert() {
    let alert = this.alertCtrl.create({
      title: 'You are successfully registered',
      subTitle: 'Log with your email and password',
      buttons: ['OK']
    });
    alert.present();
  }


}
