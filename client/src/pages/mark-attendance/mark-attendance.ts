import {Component} from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {ScanQRCodePage} from '../scan-qrcode/scan-qrcode';
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {ViewCoursesPage} from "../view-courses/view-courses";
import {AuthProvider} from "../../providers/auth/auth";


@Component({
  selector: 'page-mark-attendance',
  templateUrl: 'mark-attendance.html',
})
export class MarkAttendancePage {
  scannedCode = null;
  public message: any;
  public subMessage: any;
  public studentObj: any;
  public matchedSearch: any;
  public matchedId: any;
  available: any;
  public avlblStudents: any;

  public selectWeek: any;
  unit_Ob: any;

  constructor(public navCtrl: NavController, public navParam: NavParams, private barcodeScanner: BarcodeScanner, public alertCtrl: AlertController, public authProvider: AuthProvider) {

    this.unit_Ob = this.navParam.data;
    console.log(this.unit_Ob);

  }

  checkAvailability(id, week) {

    this.authProvider.checkWeekAvailability(id, week)
      .then(data => {
        this.available = data;
        console.log(this.available);

      });

    return this.available;
  }

  getAvailableStudents() {

    this.authProvider.getUnitStudents(this.unit_Ob.unit_id).then(data => {
      this.avlblStudents = data;
      console.log(this.avlblStudents);

    });

    this.avlblStudents = JSON.stringify(this.avlblStudents);
    console.log(this.avlblStudents);
    return this.avlblStudents;

  }

  scanStudentQRCode() {

    console.log(this.selectWeek);

    if (this.checkAvailability(this.unit_Ob.unit_id, this.selectWeek)) {
      // this.message = this.selectWeek + " already marked";
      this.showStudentScannedPopup('week');
    
    } else {


      this.barcodeScanner.scan().then(barcodeData => {
        this.scannedCode = barcodeData.text;
        var str = this.scannedCode;
        str = str.substring(0, str.length - 3);
        this.scannedCode = str.toString().split('').pop();
        //var studentId = 's3115458';


        var studentIdArray = this.getAvailableStudents();
        console.log(studentIdArray);
        /*var studentIdArray = {
          "students": [
            {"name": "Student1", "student_id": "S310954", "user_id": "1"},
            {"name": "Lecturer1", "student_id": "L234789", "user_id": "2"},
            {"name": "Rock", "student_id": "S377488", "user_id": "3"},
            {"name": "Rock", "student_id": "S987124", "user_id": "4"},
            {"name": "Rock1", "student_id": "S123654", "user_id": "5"},
            {"name": "RockFang", "student_id": "S897567", "user_id": "6"}
          ]
        }*/

        this.studentObj = studentIdArray.students;

        for (var i = 0; i < this.studentObj.length; i++) {
          this.matchedSearch = this.studentObj[i].user_id;
          if (this.matchedSearch == this.scannedCode) {
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

  }

  goToScanQRCode(params) {
    if (!params) params = {};
    this.navCtrl.push(ScanQRCodePage);
  }


  showStudentScannedPopup(result) {
    if (result == 'match') {
      this.message = "Student marked successfully";
      this.subMessage = "Please press new student button to mark the next student or press finish button to end marking";
    }
    else if(result == 'unmatch') {
      this.message = "No student records found";
      this.subMessage = "Please press new student button to try again or press finish button to end marking";
    }else if(result=='week')
    {
      this.message = "Already Marked";
      this.subMessage = "This week is already marked";
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
