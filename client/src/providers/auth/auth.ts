import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  apiURL = 'https://cdu-mas.herokuapp.com/api';
  // apiAdminURL='https://cdu-mas.herokuapp.com/api';

  public authToken;
  public userId;

  constructor(public http: HttpClient) {
    console.log('Hello AuthProvider Provider');
  }


  userLogin(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiURL + '/auth/login', JSON.stringify(data), {
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


  userLogOut() {

    return new Promise((resolve, reject) => {
      this.http.post(this.apiURL + '/auth/logout', "", {
        headers: new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json')
          .set('Authorization', 'Bearer' + this.getToken()),
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


  userRegistration(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiURL + '/register', JSON.stringify(data), {
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

  getUser() {

    return new Promise((resolve, reject) => {
      this.http.post(this.apiURL + '/auth/me', "", {
        headers: new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json')
          .set('Authorization', 'Bearer' + this.getToken()),
      })
        .subscribe(res => {
          resolve(res);
          this.userId = res["id"];
          console.log(res);

        }, (err) => {
          reject(err);
          console.log(err);
        })
    });
  }

  getUnits() {
    return new Promise((resolve, reject) => {
      this.http.get(this.apiURL + '/unit', {
        params: {id: this.userId},
        headers: new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json')
          .set('Authorization', 'Bearer' + this.getToken()),
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

    window.localStorage.setItem("token", token);
    console.log("token saved");

  }

  getToken() {
    return window.localStorage.getItem("token");
  }


  getUnitStudents(unit_id) {
    return new Promise((resolve, reject) => {
      this.http.get(this.apiURL + '/mark', {
        params: {id: unit_id},
        headers: new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json')
          .set('Authorization', 'Bearer' + this.getToken()),
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

  checkWeekAvailability(unit_id,week)
  {
    return new Promise((resolve, reject) => {
      this.http.get(this.apiURL + '/mark/check', {
        params: {id: unit_id,week: week},
        headers: new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json')
          .set('Authorization', 'Bearer' + this.getToken()),
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
