import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ScanQRCodePage } from '../scan-qrcode/scan-qrcode';
import { SearchAttendancePage } from '../search-attendance/search-attendance';
import { BarcodeScanner} from "@ionic-native/barcode-scanner";

@Component({
  selector: 'page-course',
  templateUrl: 'course.html'
})
export class CoursePage {
  scannedCode=null;

  constructor(public navCtrl: NavController,private barcodeScanner : BarcodeScanner) {
  }

  scanStudentQRCode(){

    /*if (this.platform.is('cordova')) {
      this.barcodeScanner.scan().then( barcodeData =>
        this.scannedCode = barcodeData.text);

    } else {
      this.barcodeScanner.scan().then( barcodeData =>
        this.scannedCode = barcodeData.text);

    }*/
    this.barcodeScanner.scan().then( barcodeData =>
    this.scannedCode = barcodeData.text);
  }
  goToScanQRCode(params){
    if (!params) params = {};
    this.navCtrl.push(ScanQRCodePage);
  }goToSearchAttendance(params){
    if (!params) params = {};
    this.navCtrl.push(SearchAttendancePage);
  }
}
