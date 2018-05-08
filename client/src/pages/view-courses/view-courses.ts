import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {CoursePage} from '../course/course';

@Component({
  selector: 'page-view-courses',
  templateUrl: 'view-courses.html'
})
export class ViewCoursesPage {

  constructor(public navCtrl: NavController) {
  }
  
  gotoCourse() {
    this.navCtrl.push(CoursePage);
  }
}
