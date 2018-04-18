import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  user = {email: '',name:'', password: '',student_id:'',mobile:'',type:''};

  constructor(public navCtrl: NavController) {
  }

}
