import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ViewQRCodePage } from '../view-qrcode/view-qrcode';
//import { StudentHomePage } from '../student-home/student-home';

@Component({
  selector: 'page-student-home',
  templateUrl: 'student-home.html'
})
export class StudentHomePage {

  constructor(public navCtrl: NavController) {
  }
  goToViewQRCode(params){
    if (!params) params = {};
    this.navCtrl.push(ViewQRCodePage);
  }goToStudentHome(params){
    if (!params) params = {};
    this.navCtrl.push(StudentHomePage);
  }
}
