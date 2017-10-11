import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { TripProvider } from '../../providers/trip/trip';

@IonicPage()
@Component({
  selector: 'page-current',
  templateUrl: 'current.html',
})
export class CurrentPage {

  public trips:any = [];

  constructor(
    public navCtrl: NavController,
    public tripService: TripProvider) {
  }

  ionViewWillEnter() {
    this.getCurrenTrips();
  }

  public getCurrenTrips(){
    this.tripService.currentTrips().then((result) => {
      this.trips = result.trips;
    }, (err) => {
      console.log(err);
    })
  }

}
