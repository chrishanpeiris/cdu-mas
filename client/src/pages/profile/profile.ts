import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UpdateProfilePage } from '../update-profile/update-profile';
import { ChangePasswordPage } from '../change-password/change-password';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  constructor(public navCtrl: NavController) {
  }
  goToUpdateProfile(params){
    if (!params) params = {};
    this.navCtrl.push(UpdateProfilePage);
  }goToChangePassword(params){
    if (!params) params = {};
    this.navCtrl.push(ChangePasswordPage);
  }
}
