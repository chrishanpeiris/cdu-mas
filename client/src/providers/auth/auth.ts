import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  apiURL='http://localhost:8000/api';

  public authToken;

  constructor(public http: HttpClient) {
    console.log('Hello AuthProvider Provider');
  }


  userLogin(data) {
    return new Promise((resolve,reject)=>{
      this.http.post(this.apiURL+'/auth/login', JSON.stringify(data), {
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

  userRegistration(data){
    return new Promise((resolve,reject)=>{
      this.http.post(this.apiURL+'/register', JSON.stringify(data), {
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

  getUser(){

    return new Promise((resolve,reject)=>{
      this.http.post(this.apiURL+'/auth/me', "", {
        headers: new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json')
          .set('Authorization','Bearer'+this.getToken()),
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


 storeToken(token) {

    window.localStorage.setItem("token",token);
    console.log("token saved");

  }

getToken(){
    return window.localStorage.getItem("token");
}

}
