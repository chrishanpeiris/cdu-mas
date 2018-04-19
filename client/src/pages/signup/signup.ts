import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {BarcodeScanner} from "@ionic-native/barcode-scanner";


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  set qrData(value: any) {
    this._qrData = value;
  }
  get qrData(): any {
    return this._qrData;
  }
  set qrData2(value: any) {
    this._qrData2 = value;
  }
  get qrData2(): any {
    return this._qrData2;
  }
  private _qrData = null;
  _qrData2 = null;
  createdCode = null;
  scannedCode = null;

  constructor(public navCtrl: NavController, private barcodeScanner: BarcodeScanner) { }
  createCode() {
    this.createdCode = this._qrData + this._qrData2;
    console.log( this._qrData + this._qrData2);
  }

  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedCode = barcodeData.text;
    }, (err) => {
      console.log('Error: ', err);
    });
  }

}
