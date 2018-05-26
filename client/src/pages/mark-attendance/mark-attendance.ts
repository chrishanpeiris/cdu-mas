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
  public authresponse: any;
  public autherrors: any;
  public selectWeek: any;
  unit_Ob: any;
  public spinner : boolean=false;

  attendance = {unit_id: 0, student_id: 0, week_number: 0, attendance: 0};

  constructor(public navCtrl: NavController, public navParam: NavParams, private barcodeScanner: BarcodeScanner, public alertCtrl: AlertController, public authProvider: AuthProvider) {

    this.unit_Ob = this.navParam.data;
    console.log("unit_Ob in const")
    console.log(this.unit_Ob);
    console.log("default Week");
    this.selectWeek = 1;
    console.log(this.selectWeek);
    // console.log("checkAvailability in const")
    console.log(this.checkAvailability(this.unit_Ob.unit_id, this.selectWeek));
    console.log("getAvailableStudents in const")
    console.log(this.getAvailableStudents());

  }

  checkAvailability(id, week) {
    this.spinner = true;
    this.authProvider.checkWeekAvailability(id, week)
      .then(data => {
        this.spinner = false;
        this.available = data;
        console.log(id);
        console.log(week);
        console.log("availabl var | checkWeek")
        console.log(this.available);

      });

    return this.available;
  }

  getAvailableStudents() {
    this.spinner = true;
    this.authProvider.getUnitStudents(this.unit_Ob.unit_id).then(data => {
      this.spinner = false;
      this.avlblStudents = data;
      console.log("avlblStudents var | getAvailableStudents")
      console.log(this.avlblStudents);

    });

    /* this.avlblStudents = JSON.parse(this.avlblStudents);
     console.log("avlblStudents var | getAvailableStudents parse");
     console.log(this.avlblStudents);*/
    return this.avlblStudents;

  }


  scanStudentQRCode() {

    console.log(this.selectWeek);
    var weekStatus = this.checkAvailability(this.unit_Ob.unit_id, this.selectWeek);
    console.log("week Status");
    console.log(weekStatus);
    if (weekStatus == true) {
      // this.message = this.selectWeek + " already marked";
      this.showWeekScannedPopup(weekStatus, this.selectWeek, this.unit_Ob);

    } else if (weekStatus == false) {

      var studentIdArray = this.getAvailableStudents();
      console.log("Scan | Student Array");
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

      this.studentObj = studentIdArray;
      console.log("Scan | studentObj");
      console.log(this.studentObj);
      console.log("studentObj.length");
      console.log(this.studentObj.length);


      this.barcodeScanner.scan().then(barcodeData => {
        this.scannedCode = barcodeData.text;
        var str = this.scannedCode;
        str = str.substring(0, str.length - 3);
        this.scannedCode = str.slice(-2);

        var number1 = this.scannedCode.substring(0, this.scannedCode.length - 1);
        var number2 = this.scannedCode;


        if (number1 == 0) {
          this.scannedCode = this.scannedCode.slice(-1);
        }
        else {
          this.scannedCode = number2;
        }

        //var studentId = 's3115458';


        for (var i = 0; i < this.studentObj.length; i++) {
          this.matchedSearch = this.studentObj[i].user_id;

          this.attendance.unit_id = this.unit_Ob.unit_id;
          this.attendance.student_id = this.studentObj[i].user_id;
          this.attendance.week_number = this.selectWeek;
          this.attendance.attendance = 0;
          console.log("mark students")
          console.log(this.attendance);
          this.markStudent(this.attendance);

          if (this.matchedSearch == this.scannedCode) {
            this.matchedId = this.matchedSearch;
            this.attendance.unit_id = this.unit_Ob.unit_id;
            this.attendance.student_id = this.studentObj[i].user_id;
            this.attendance.week_number = this.selectWeek;
            this.attendance.attendance = 1;
            console.log("mark student updated")
            console.log(this.attendance);
            this.markStudentAttendance(this.attendance);

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
    else if (result == 'unmatch') {
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

  showWeekScannedPopup(result, week, obj) {
    if (result == true) {
      this.message = "Week " + week + " has already marked";
      this.subMessage = "Please select new week";
    }

    let alert = this.alertCtrl.create({
      title: this.message,
      subTitle: this.subMessage,
      buttons: [
        {
          text: 'Finish',
          handler: () => {
            this.navCtrl.push(MarkAttendancePage, obj);
          }
        }]
    });
    alert.present();
  }

  markStudent(data) {

    this.authProvider.markAttendance(data).then((result) => {
      this.authresponse = result;
      console.log("student marked")
      console.log(this.authresponse);
      return true;
    }, (err) => {
      this.autherrors = err;
      if (err.statusText = "Unauthorized") {
        return false;
      }
      console.log(this.autherrors);
      return false;
    });

  }

  markStudentAttendance(data) {

    this.authProvider.updateAttendance(data).then((result) => {
      this.authresponse = result;
      console.log("student mark updated")
      console.log(this.authresponse);
      return true;
    }, (err) => {
      this.autherrors = err;
      if (err.statusText = "Unauthorized") {
        return false;
      }
      console.log(this.autherrors);
      return false;
    });

  }

}
