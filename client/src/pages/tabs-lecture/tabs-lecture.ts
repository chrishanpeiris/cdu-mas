import { Component } from '@angular/core';
import { IonicPage, NavController, App } from 'ionic-angular';
import { LectureHomePage } from '../lecture-home/lecture-home';
import { ViewCoursesPage } from '../view-courses/view-courses';

/**
 * Generated class for the TabsLecturePage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs-lecture',
  templateUrl: 'tabs-lecture.html'
})
export class TabsLecturePage {

  homeRoot = LectureHomePage;
  viewCourseRoot = ViewCoursesPage;


  constructor(public navCtrl: NavController, public app:App) {}

  logoutClicked() {
    const root = this.app.getRootNav();
    root.popToRoot();
  }

}
