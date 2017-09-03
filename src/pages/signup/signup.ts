import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  email: string;
  password: string;
  loading: any;

  constructor(public navCtrl: NavController, public authService:AuthProvider, public loadingCtrl: LoadingController) {
  }

  register(){
    this.showLoader();

    let details = {
      email: this.email,
      password: this.password
    };

    this.authService.createAccount(details).then((result) => {
      this.loading.dismiss();
      this.navCtrl.setRoot(HomePage);
    }, (err) => {
      this.loading.dismiss()
    });

  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
      content: 'Authenticatin...'
    });
    this.loading.present();
  }
}
