import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage {

  constructor(
    public navCtrl: NavController,
    public authService: AuthProvider) {}

  ionViewWillEnter(){
  }

  goSearchTrip() {
    this.navCtrl.push('SearchTripPage');
  }

  goStartTrip(){
    this.navCtrl.push('StartTripPage');
  }

  goProfile(){
    this.navCtrl.push('ProfilePage');
  }

}
