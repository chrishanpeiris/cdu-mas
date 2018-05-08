import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { StudentHomePage } from '../student-home/student-home';
import { ViewQRCodePage } from '../view-qrcode/view-qrcode';
import { LoginPage } from '../login/login';

/**
 * Generated class for the TabsStudentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tabs-student',
  templateUrl: 'tabs-student.html',
})
export class TabsStudentPage {

  tab1Root: any = StudentHomePage;
  tab2Root: any = ViewQRCodePage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public app:App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsStudentPage');
  }
  logoutClicked() {
    const root = this.app.getRootNav();
    root.popToRoot();
  }

}
