import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthProvider } from '../auth/auth';
import { EnvVariables } from '../../app/environment-variables/environment-variables.token';
import 'rxjs/add/operator/map';

@Injectable()
export class TodosProvider {
  public apiURL:any;

  constructor(
    public http: Http,
    public authService: AuthProvider,
    @Inject(EnvVariables) public envVariables) {
      this.apiURL = envVariables.apiEndpoint + "api/todos/";
    }

  getTodos(){
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

  createTodo(todo){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', this.authService.token);

      this.http.post(this.apiURL, JSON.stringify(todo), {headers: headers})
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  deleteTodo(id){
    return new Promise((resolve, reject) =>{
      let headers = new Headers();
      headers.append('Authorization', this.authService.token);

      this.http.delete(this.apiURL + id, {headers: headers})
        .subscribe((res) => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

}
