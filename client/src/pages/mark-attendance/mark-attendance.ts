import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ScanQRCodePage } from '../scan-qrcode/scan-qrcode';
import { BarcodeScanner} from "@ionic-native/barcode-scanner";


@Component({
  selector: 'page-mark-attendance',
  templateUrl: 'mark-attendance.html',
})
export class MarkAttendancePage {
  scannedCode=null;
  constructor(public navCtrl: NavController, private barcodeScanner : BarcodeScanner) {
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
  }

}
