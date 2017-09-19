import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthProvider } from '../auth/auth';
import { EnvVariables } from '../../app/environment-variables/environment-variables.token';
import 'rxjs/add/operator/map';

@Injectable()
export class UserProvider {

  public apiURL: any;

  constructor(
    public http: Http,
    public authService: AuthProvider,
    @Inject(EnvVariables) public envVariables) {
      this.apiURL = envVariables.apiEndpoint + "api/users/";
  }

  getUser(){
    return new Promise((resolve,reject) => {
      let headers = new Headers();
      headers.append('Authorization', this.authService.token);

      this.http.get(this.apiURL, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

}
