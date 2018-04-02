import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ScanQRCodePage } from '../scan-qrcode/scan-qrcode';
import { SearchAttendancePage } from '../search-attendance/search-attendance';

@Component({
  selector: 'page-course',
  templateUrl: 'course.html'
})
export class CoursePage {

  constructor(public navCtrl: NavController) {
  }
  goToScanQRCode(params){
    if (!params) params = {};
    this.navCtrl.push(ScanQRCodePage);
  }goToSearchAttendance(params){
    if (!params) params = {};
    this.navCtrl.push(SearchAttendancePage);
  }
}
