import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StudentHomePage } from '../student-home/student-home';
//import { ViewQRCodePage } from '../view-qrcode/view-qrcode';

@Component({
  selector: 'page-view-qrcode',
  templateUrl: 'view-qrcode.html'
})
export class ViewQRCodePage {

  constructor(public navCtrl: NavController) {
  }
  goToStudentHome(params){
    if (!params) params = {};
    this.navCtrl.push(StudentHomePage);
  }goToViewQRCode(params){
    if (!params) params = {};
    this.navCtrl.push(ViewQRCodePage);
  }
}
