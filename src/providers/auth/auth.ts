import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { EnvVariables } from '../../app/environment-variables/environment-variables.token';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthProvider {
  public token:any;

  constructor(public http: Http, public storage: Storage,  @Inject(EnvVariables) public envVariables) {}

  checkAuthentication(){
    return new Promise((resolve,reject) =>{
      this.storage.get('token').then((value)=> {
        this.token = value;
        let headers = new Headers();
        headers.append('Authorization', this.token);

        this.http.get(this.envVariables.apiEndpoint + 'api/auth/protected', {headers: headers})
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
    });
  }

  createAccount(details){
    return new Promise((resolve,reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.post(this.envVariables.apiEndpoint + 'api/auth/register', JSON.stringify(details), {headers: headers})
        .subscribe(res => {
          let data = res.json();
          this.token = data.token;
          this.storage.set('token', data.token);
          resolve(data);
        }, (err) =>{
          reject(err);
        });
    });
  }

  login(credentials){
    return new Promise((resolve,reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.post(this.envVariables.apiEndpoint + 'api/auth/login', JSON.stringify(credentials), {headers: headers})
        .subscribe(res => {
          let data = res.json();
          this.token = data.token;
          this.storage.set('token', data.token);
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  logout(){
    this.storage.set('token', '');
  }
}
