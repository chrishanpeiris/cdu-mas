import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StudentHomePage } from '../student-home/student-home';
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {AuthProvider} from "../../providers/auth/auth";
//import { ViewQRCodePage } from '../view-qrcode/view-qrcode';

@Component({
  selector: 'page-view-qrcode',
  templateUrl: 'view-qrcode.html'
})
export class ViewQRCodePage {

  createdCode:any;
  user:any;

  constructor(public navCtrl: NavController,private barcodeScanner: BarcodeScanner, public authProvider: AuthProvider) {

    this.createCode();

  }


  createCode(){
    this.getUserCode();
    // this.createdCode=this.student_code;
    console.log("QRcode Generated");
  }

  getUserCode(){
    this.authProvider.getUser()
      .then(data =>{
        this.user=data;
        this.createdCode=this.user.student_id;
        console.log(this.createdCode);

      });
  }

  goToStudentHome(params){
    if (!params) params = {};
    this.navCtrl.push(StudentHomePage);
  }goToViewQRCode(params){
    if (!params) params = {};
    this.navCtrl.push(ViewQRCodePage);
  }
}
