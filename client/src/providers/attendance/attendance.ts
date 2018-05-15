import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AuthProvider} from "../auth/auth";

/*
  Generated class for the AttendanceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AttendanceProvider {

  apiURL='https://cdu-mas.herokuapp.com/api';

  constructor(public http: HttpClient,public authProvider: AuthProvider) {
    console.log('Hello AttendanceProvider Provider');
  }


  getUnits(){

    return new Promise((resolve,reject)=>{
      this.http.get(this.apiURL+'/unit', {
        params: { id: this.authProvider.userId},
        headers: new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json')
          .set('Authorization','Bearer'+this.authProvider.getToken()),
      })
        .subscribe(res => {
          resolve(res);
          console.log(res);

        }, (err) => {
          reject(err);
          console.log(err);
        })
    });
  }


}
