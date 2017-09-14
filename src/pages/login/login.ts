import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  email: string;
  password: string;
  loading: any;

  constructor(public navCtrl: NavController,  public authService: AuthProvider, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.showLoader();

    this.authService.checkAuthentication().then((res) => {
      this.loading.dismiss();
      this.navCtrl.setRoot(HomePage);
    }, (err) => {
      this.loading.dismiss();
    });
  }

  login(){
    this.showLoader();

    let credentials = {
      email: this.email,
      password: this.password
    };

    this.authService.login(credentials).then((result) => {
      this.loading.dismiss();
      this.navCtrl.setRoot(HomePage);
    }, (err) => {
      this.loading.dismiss();
    });
  }

  facebookLogin(){
    this.showLoader();

    this.authService.fbLogin().then((result) =>{
      this.loading.dismiss();
      this.navCtrl.setRoot(HomePage);
    }, (err) => {
      this.loading.dismiss();
    });
  }

  launchSignUp(){
    this.navCtrl.push(SignupPage);
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });

    this.loading.present();
  }
}
