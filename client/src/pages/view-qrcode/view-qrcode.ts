import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StudentHomePage } from '../student-home/student-home';
/*import {BarcodeScanner} from "@ionic-native/barcode-scanner";*/
import {AuthProvider} from "../../providers/auth/auth";
//import { ViewQRCodePage } from '../view-qrcode/view-qrcode';

@Component({
  selector: 'page-view-qrcode',
  templateUrl: 'view-qrcode.html'
})
export class ViewQRCodePage {

  createdCode:any;
  user:any;
  randomNumber:any;
  public spinner : boolean=false;


  constructor(public navCtrl: NavController,/*private barcodeScanner: BarcodeScanner,*/ public authProvider: AuthProvider) {

    this.createCode();

  }
    //
    

  createCode(){
    this.getUserCode();
    // this.createdCode=this.student_code;
    console.log("QRcode Generated");
  }

  getUserCode(){
    this.spinner = true;
    this.randomNumber = Math.floor((Math.random() * (999-100)) + 100);
    this.authProvider.getUser()
      .then(data =>{
        this.spinner = false;
        this.user=data;
        this.createdCode=this.user.student_id +'0'+ this.user.id+this.randomNumber;
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
