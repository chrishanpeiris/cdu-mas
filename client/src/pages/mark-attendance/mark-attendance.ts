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
<<<<<<< HEAD

  unit_id:string;
  constructor(public navCtrl: NavController,public navParam:NavParams, private barcodeScanner : BarcodeScanner, public alertCtrl: AlertController) {
    this.unit_id=this.navParam.data;
    console.log(this.unit_id);
=======
  public studentObj:any;
  public matchedSearch:any;
  public matchedId:any;
  constructor(public navCtrl: NavController, private barcodeScanner : BarcodeScanner, public alertCtrl: AlertController) {
>>>>>>> cf02bf4cf874fbc9c11428773493fa6737e72a10
  }

  scanStudentQRCode(){

    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedCode = barcodeData.text;
      var str = this.scannedCode;
      str = str.substring(0, str.length-4);
      this.scannedCode = str;
      //var studentId = 's3115458';
      var studentIdArray = {
        "students": [
            { "name":"Student1", "student_id":"S310954" },
            { "name":"Lecturer1", "student_id":"L234789" },
            { "name":"Rock", "student_id":"S377488" },
            { "name":"Rock", "student_id":"S987124" },
            { "name":"Rock1", "student_id":"S123654" },
            { "name":"RockFang", "student_id":"S897567" }
        ]
     }

     this.studentObj = studentIdArray.students;

     for (var i = 0; i < this.studentObj.length; i++) {
        this.matchedSearch = this.studentObj[i].student_id;
        if (this.matchedSearch == this.scannedCode){
          this.matchedId = this.matchedSearch;
        }  
     }
  
      if (this.scannedCode == this.matchedId) {
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
            this.navCtrl.push(ViewCoursesPage);
        }
      }]
    });
    alert.present();
  }

}
