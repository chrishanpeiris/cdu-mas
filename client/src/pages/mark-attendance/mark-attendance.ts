import { Component } from '@angular/core';
import {NavController, AlertController, NavParams} from 'ionic-angular';
import { ScanQRCodePage } from '../scan-qrcode/scan-qrcode';
import { BarcodeScanner} from "@ionic-native/barcode-scanner";
import {ViewCoursesPage} from "../view-courses/view-courses";


@Component({
  selector: 'page-mark-attendance',
  templateUrl: 'mark-attendance.html',
})
export class MarkAttendancePage {
  scannedCode=null;
  public message:any;
  public subMessage:any;

  unit_id:string;
  constructor(public navCtrl: NavController,public navParam:NavParams, private barcodeScanner : BarcodeScanner, public alertCtrl: AlertController) {
    this.unit_id=this.navParam.data;
    console.log(this.unit_id);
  }

  scanStudentQRCode(){

    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedCode = barcodeData.text;
      var studentId = 's3115458';
      if (this.scannedCode == studentId) {
        this.showStudentScannedPopup('match');
      }
      else {
        this.showStudentScannedPopup('unmatch');
      }
     }).catch(err => {
         console.log('Error', err);
     });
  }
  goToScanQRCode(params){
    if (!params) params = {};
    this.navCtrl.push(ScanQRCodePage);
  }

  showStudentScannedPopup(result) {
    if (result == 'match') {
      this.message = "Student marked successfully";
      this.subMessage = "Please press new student button to mark the next student or press finish button to end marking";
    }
    else  {
      this.message = "No student records found";
      this.subMessage = "Please press new student button to try again or press finish button to end marking";
    }
    let alert = this.alertCtrl.create({
      title: this.message,
      subTitle: this.subMessage,
      buttons: [{
        text: 'New student',
        handler: () => {
          this.scanStudentQRCode();
        }
      },
      {
        text: 'Finish',
        handler: () => {
            this.navCtrl.push(ScanQRCodePage);
        }
      }]
    });
    alert.present();
  }

}
