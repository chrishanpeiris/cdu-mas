import { Component } from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";
//import {StudentHomePage} from "../student-home/student-home";
import {LoginPage} from "../login/login";

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

 public type : boolean=false;
 public spinner : boolean=false;
 public validationError: any;


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

 public user = {email: '',name:'', password: '',student_id:'',mobile:'',type:0 ,device:'',_token:''};


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
      //var errorMsg = this.authresponse;
      if (!!this.authresponse.token){
        this.spinner = false;
        this.showRegistrationSuccessAlert();
        this.navCtrl.push(LoginPage);
      }
      else if (this.authresponse.name == "The name field is required." ) {
        this.spinner = false;
        this.validationError = this.authresponse.name;
        this.showValidationAlert();
      }
      else if (this.authresponse.email == "The email field is required." || this.authresponse.email == "The email must be a valid email address." || this.authresponse.email == "The email has already been taken.") {
        this.spinner = false;
        this.validationError = this.authresponse.email;
        this.showValidationAlert();
      }
      else if (this.authresponse.student_id == "The student id field is required." || this.authresponse.student_id == "The student id may not be greater than 7 characters." || this.authresponse.student_id == "The student id must be at least 7 characters.") {
        this.spinner = false;
        this.validationError = this.authresponse.student_id;
        this.showValidationAlert();
      }
      else if (this.authresponse.mobile == "The mobile field is required." || this.authresponse.mobile == "The mobile may not be greater than 10 characters." || this.authresponse.mobile == "The mobile must be at least 10 characters.") {
        this.spinner = false;
        this.validationError = this.authresponse.mobile;
        this.showValidationAlert();
      }
      else if (this.authresponse.password == "The password field is required." || this.authresponse.password == "The password must be at least 6 characters." || this.authresponse.password == "The password confirmation does not match." || this.authresponse.password == "The password must be at least 6 characters.", "The password confirmation does not match.") {
        this.spinner = false;
        this.validationError = this.authresponse.password;
        this.showValidationAlert();
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
  }
  showRegistrationSuccessAlert() {
    let alert = this.alertCtrl.create({
      title: 'You are successfully registered',
      subTitle: 'Log with your email and password',
      buttons: ['OK']
    });
    alert.present();
  }

  showValidationAlert() {
    let alert = this.alertCtrl.create({
      title: 'Warning',
      subTitle: this.validationError,
      buttons: ['OK']
    });
    alert.present();
  }


}
