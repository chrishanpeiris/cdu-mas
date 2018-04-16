import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  apiURL='http://localhost:8000/api/auth';

  constructor(public http: HttpClient) {
    console.log('Hello AuthProvider Provider');
  }


  userLogin(data) {
    return new Promise((resolve,reject)=>{
      this.http.post(this.apiURL+'/login', JSON.stringify(data), {
        headers: new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json'),
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
