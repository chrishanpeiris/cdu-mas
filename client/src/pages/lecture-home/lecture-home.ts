import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ViewQRCodePage } from '../view-qrcode/view-qrcode';
import { StudentHomePage } from '../student-home/student-home';
import {AuthProvider} from "../../providers/auth/auth";
import {AttendanceProvider} from "../../providers/attendance/attendance";

@Component({
  selector: 'page-lecture-home',
  templateUrl: 'lecture-home.html'
})
export class LectureHomePage {

  public lecturer:any;

  constructor(public navCtrl: NavController,public authProvider : AuthProvider,public attandance:AttendanceProvider) {
    this.getLecturer();
    this.attandance.getUnits()
      .then(data =>{
        console.log(data);
      });
  }
  goToViewQRCode(params){
    if (!params) params = {};
    this.navCtrl.push(ViewQRCodePage);
  }goToStudentHome(params){
    if (!params) params = {};
    this.navCtrl.push(StudentHomePage);
  }

  getLecturer(){
    this.authProvider.getUser()
      .then(data =>{
        this.lecturer=data;
        console.log(this.lecturer);

      });

  }

}
