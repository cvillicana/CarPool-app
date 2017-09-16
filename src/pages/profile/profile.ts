import { Component } from '@angular/core';
import { IonicPage, NavController, App } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(
    public app: App,
    public navCtrl: NavController,
    public authService: AuthProvider) {}

  logOut(){
    this.authService.logout();
    this.app.getRootNav().setRoot(LoginPage);
  }

  }
