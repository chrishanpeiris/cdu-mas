import { Component } from '@angular/core';
import {NavController, AlertController, NavParams} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";
import {AttendanceProvider} from "../../providers/attendance/attendance";

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
  public precenStudnt:any;
  public allstudents:any;

  constructor(public navCtrl: NavController,public navParam:NavParams, public authProvider: AuthProvider, public alertCtrl: AlertController,public atndncProvider:AttendanceProvider) {
    this.unit_Ob = this.navParam.data;
    console.log("unit_Ob in const")
    console.log(this.unit_Ob);
    console.log(this.unit_Ob.unit_id);
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


    this.showWeekScannedPopup(this.selectWeek,this.getPresentStudents(),this.getAllStudents());

  }

  showWeekScannedPopup(week, total,all) {

    let alert = this.alertCtrl.create({
      title: "Week " + week + " Summary",
      subTitle: "Total attendance : " +total+ "/"+all,
      buttons: [
        {
          text: 'Ok',
        }]
    });
    alert.present();
  }

  getAllStudents()
  {
    this.atndncProvider.getAllStudents(this.unit_Ob.unit_id,this.selectWeek)
      .then(data => {
        console.log(data);
        this.allstudents=data;
        console.log(this.allstudents);
        console.log(this.unit_Ob.unit_id);
        console.log(this.selectWeek);

      });

    return this.allstudents;
  }

  getPresentStudents(){
    this.atndncProvider.getAttendance(this.unit_Ob.unit_id,this.selectWeek)
      .then(data => {
        console.log(data);
        this.precenStudnt=data;
        console.log(this.precenStudnt);
        console.log(this.unit_Ob.unit_id);
        console.log(this.selectWeek);

      });

    return this.precenStudnt;
  }

}
