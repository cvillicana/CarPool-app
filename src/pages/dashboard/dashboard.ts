import { Component } from '@angular/core';
import { IonicPage, NavController, App} from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AuthProvider } from '../../providers/auth/auth';


@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage {

  constructor(
    public app: App,
    public navCtrl: NavController,
    public authService: AuthProvider) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

  goSearchTrip() {
    this.navCtrl.push('SearchTripPage');
  }

  goStartTrip(){
    this.navCtrl.push('StartTripPage');
  }

  logOut(){
    this.authService.logout();
    this.app.getRootNav().setRoot(LoginPage);
  }

}
