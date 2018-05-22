import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {CoursePage} from '../course/course';
import {AuthProvider} from "../../providers/auth/auth";

@Component({
  selector: 'page-view-courses',
  templateUrl: 'view-courses.html',
})
export class ViewCoursesPage {
  units:any;
  unit_id:any;
  //public unitid :any;
  public unit:any = {cid: ""};
  public spinner : boolean=false;
  constructor(public navCtrl: NavController, public authProvider : AuthProvider) {
    this.getUnits();
  }

  gotoCourse(id) {
    this.navCtrl.push(CoursePage,id);
  }

  getUnits(){
    this.spinner = true;
    this.authProvider.getUnits()
      .then(data =>{
        this.units=data;
        this.spinner = false;
        console.log(this.units);

      });
  }
}
