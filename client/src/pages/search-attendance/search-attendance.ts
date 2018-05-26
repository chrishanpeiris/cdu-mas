import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";

@Component({
  selector: 'page-search-attendance',
  templateUrl: 'search-attendance.html'
})
export class SearchAttendancePage {

  public selectWeek: any;
  available: any;
  public spinner : boolean=false;
  unit_Ob: any;
  public matchedWeek : any;
  public unitId :any;
  public studentId :any; 
  public attendance :any;
  public totalAttendance :any;
  public attendanceObj : any;
  public weekStatus :any;

  constructor(public navCtrl: NavController, public authProvider: AuthProvider, public alertCtrl: AlertController) {
    this.selectWeek = 1;

    
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

  searchAttendance() {
    this.weekStatus = false;
    console.log(this.selectWeek);
    /*var weekStatus = this.checkAvailability(this.unit_Ob.unit_id, this.selectWeek);
    console.log("week Status");
    console.log(weekStatus);*/
    if (this.weekStatus == true) {

    } 
    
    else if (this.weekStatus == false) {
      var attendanceArray = [
          {"unit_id": "1", "student_id": "S310954", "week_number": "1", "attendance": "1"},
          {"unit_id": "2", "student_id": "S310544", "week_number": "2", "attendance": "1"},
          {"unit_id": "3", "student_id": "S310955", "week_number": "3", "attendance": "1"},
          {"unit_id": "1", "student_id": "S310958", "week_number": "4", "attendance": "1"},
          {"unit_id": "2", "student_id": "S310940", "week_number": "4", "attendance": "0"},
      ];

      this.attendanceObj = attendanceArray;

      for (var i = 0; i < this.attendanceObj.length; i++) {
        
        if (this.selectWeek == this.attendanceObj[i].week_number) {
         this.matchedWeek = this.attendanceObj[i].week_number;
         this.unitId = this.attendanceObj[i].unit_id;
         this.studentId = this.attendanceObj[i].student_id;
         this.attendance = this.attendanceObj[i].attendance;
         this.totalAttendance = 1;
        }

       }

       if (this.selectWeek == this.matchedWeek) {
          this.showWeekScannedPopup (this.selectWeek, this.totalAttendance);
       }

    }
  
  }

  showWeekScannedPopup(week, total) {

    let alert = this.alertCtrl.create({
      title: "Week " + week + " Summary",
      subTitle: "Total attendance : " +total+ "/12",
      buttons: [
        {
          text: 'Ok',
        }]
    });
    alert.present();
  }
  
}
