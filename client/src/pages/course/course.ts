import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
//import { ScanQRCodePage } from '../scan-qrcode/scan-qrcode';
import { SearchAttendancePage } from '../search-attendance/search-attendance';
import { MarkAttendancePage } from '../mark-attendance/mark-attendance'
//import { BarcodeScanner} from "@ionic-native/barcode-scanner";

@Component({
  selector: 'page-course',
  templateUrl: 'course.html'
})
export class CoursePage {
  //scannedCode=null;
  unit_id:string;

  constructor(public navCtrl: NavController,public navParams: NavParams/*,private barcodeScanner : BarcodeScanner*/) {
    this.unit_id=this.navParams.data;
    console.log(this.unit_id);
  }

  /* moved to mark-attendace page
  scanStudentQRCode(){

    //if (this.platform.is('cordova')) {
      //this.barcodeScanner.scan().then( barcodeData =>
        //this.scannedCode = barcodeData.text);

    //} else {
      //this.barcodeScanner.scan().then( barcodeData =>
        //this.scannedCode = barcodeData.text);

    //}
    this.barcodeScanner.scan().then( barcodeData =>
    this.scannedCode = barcodeData.text);
  }
  goToScanQRCode(params){
    if (!params) params = {};
    this.navCtrl.push(ScanQRCodePage);
  }*/

  goToSearchAttendance(params){
    if (!params) params = {};
    this.navCtrl.push(SearchAttendancePage);
  }
  goToMarking(unit_id) {

    this.navCtrl.push(MarkAttendancePage,unit_id);
  }
}
