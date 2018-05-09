import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ViewQRCodePage } from '../view-qrcode/view-qrcode';
import {AuthProvider} from "../../providers/auth/auth";
// import { StudentHomePage } from '../student-home/student-home';

@Component({
  selector: 'page-student-home',
  templateUrl: 'student-home.html'
})


export class StudentHomePage {

  student:any;

  constructor(public navCtrl: NavController, public authProvide: AuthProvider) {
    this.getStudent();
  }


  goToViewQRCode(params){
    if (!params) params = {};
    this.navCtrl.push(ViewQRCodePage);
  }goToStudentHome(params){
    if (!params) params = {};
    this.navCtrl.push(StudentHomePage);
  }

  getStudent(){
    this.authProvide.getUser()
      .then(data =>{
        this.student=data;
        console.log(this.student);
      });

  }

}
