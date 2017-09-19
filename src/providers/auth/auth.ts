import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Facebook } from '@ionic-native/facebook';
import { Storage } from '@ionic/storage';
import { EnvVariables } from '../../app/environment-variables/environment-variables.token';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthProvider {
  public token:any;
  public apiURL:any;

  constructor(
    public http: Http,
    public storage: Storage,
    @Inject(EnvVariables) public envVariables,
    public fb: Facebook
  ) {
    this.apiURL = envVariables.apiEndpoint + "api/auth/";
    this.fb.browserInit(envVariables.fbAppId, "v2.8");
  }


  checkAuthentication(){
    return new Promise((resolve,reject) =>{
      this.storage.get('token').then((value)=> {
        this.token = value;
        let headers = new Headers();
        headers.append('Authorization', this.token);

        this.http.get(this.apiURL + 'protected', {headers: headers})
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

      this.http.post(this.apiURL + 'register', JSON.stringify(details), {headers: headers})
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

  fbLogin(){
    return new Promise((resolve,reject) => {
      let permissions = new Array<string>();
      let env = this;
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      permissions = ["public_profile","email"];

      this.fb.login(permissions)
        .then(function(response){
          let userId = response.authResponse.userID;
          let params = new Array<string>();

          env.fb.api("/me?fields=first_name,last_name,email", params)
            .then(function(user){
              user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
              let credentials = {
                email: user.email,
                userId: userId,
                picture: user.picture,
                password: userId,
                name: {
                  firstName:user.first_name,
                  lastName:user.last_name
                }
              };

              env.http.post(env.apiURL + 'facebook', JSON.stringify(credentials), {headers: headers})
                .subscribe(res => {
                  let data = res.json();
                  env.token = data.token;
                  env.storage.set('token', data.token);
                  resolve(data);
                }, (err) =>{
                  reject(err);
                });
            });
        }, function(error){
          reject(error);
        })
    })


  }

  login(credentials){
    return new Promise((resolve,reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.post(this.apiURL + 'login', JSON.stringify(credentials), {headers: headers})
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

  valideEmail(email){
    return new Promise((resolve,reject) =>  {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.get(this.apiURL + 'exists/'+ email, {headers:headers})
        .subscribe(res => {
          let data = res.json();
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
