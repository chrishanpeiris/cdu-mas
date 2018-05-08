import { Component } from '@angular/core';
import { IonicPage, NavController, App } from 'ionic-angular';
import { LectureHomePage } from '../lecture-home/lecture-home';
import { ViewCoursesPage } from '../view-courses/view-courses';
import {AuthProvider} from "../../providers/auth/auth";

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


  constructor(public navCtrl: NavController, public app:App, public authProvider : AuthProvider) {}

  logoutClicked() {
    this.authProvider.userLogOut().then(data =>{

      console.log(data);

    });
    const root = this.app.getRootNav();
    root.popToRoot();
  }

}
