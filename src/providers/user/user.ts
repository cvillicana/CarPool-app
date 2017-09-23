import { Injectable, Inject } from '@angular/core';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { Http, Headers } from '@angular/http';
import { AuthProvider } from '../auth/auth';
import { ImageProvider } from '../image/image';
import { EnvVariables } from '../../app/environment-variables/environment-variables.token';
import 'rxjs/add/operator/map';

import { User } from '../../models/user';

@Injectable()
export class UserProvider {

  public apiURL: any;

  constructor(
    public http: Http,
    public authService: AuthProvider,
    public imageService: ImageProvider,
    private transfer: Transfer,
    @Inject(EnvVariables) public envVariables) {
      this.apiURL = envVariables.apiEndpoint + "api/users/";
  }

  getMyUser(){
    return new Promise((resolve,reject) => {
      let headers = new Headers();
      headers.append('Authorization', this.authService.token);

      this.http.get(this.apiURL + "me", {headers: headers})
        .subscribe(res => {
          let user = <User>res.json();
          resolve(user);
        }, (err) => {
          reject(err);
        });
    });
  }

  updateUser(details){
    return new Promise((resolve,reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.put(this.apiURL + 'me', JSON.stringify(details), {headers: headers})
        .subscribe(res => {
          let user = <User>res.json();
          resolve(user);
        }, (err) =>{
          reject(err);
        });
    });
  }

  uploadImage(pathImage){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Authorization', this.authService.token);

      var options = {
        fileKey: "file",
        fileName: "filename",
        chunkedMode: false,
        mimeType: "multipart/form-data",
        params : {'fileName': "filename"},
        headers: headers
      };

      const fileTransfer: TransferObject = this.transfer.create();

      fileTransfer.upload(pathImage, this.apiURL + "me/picture", options).then((data) => {
        resolve(data);
      },(err) => {
        reject(err);
      });
    });

  }

}
