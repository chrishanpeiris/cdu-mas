import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ChangePasswordPage } from '../change-password/change-password';

@Component({
  selector: 'page-update-profile',
  templateUrl: 'update-profile.html'
})
export class UpdateProfilePage {

  constructor(public navCtrl: NavController) {
  }
  goToChangePassword(params){
    if (!params) params = {};
    this.navCtrl.push(ChangePasswordPage);
  }
}
