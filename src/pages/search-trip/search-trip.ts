import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController} from 'ionic-angular';
import { TripProvider } from '../../providers/trip/trip';

import { SearchTrip } from '../../models/searchTrip';


@IonicPage()
@Component({
  selector: 'page-search-trip',
  templateUrl: 'search-trip.html',
})
export class SearchTripPage {

  public loading: any;

  public autocompleteStart: any;
  public startSearchDirection: any;
  public optionsStart: any;

  public nearTrips: any;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public tripService: TripProvider) {
      this.autocompleteStart = {
        query : ""
      }
      this.optionsStart = {
        placeholder : "Start Trip"
      }
  }

  public getSelectionStart(selection: any): void{
    this.startSearchDirection = new SearchTrip(selection);
  }

  public searchNear():void{
    if(!this.startSearchDirection){
      return;
    }

    let coordinates = {
      lng : this.startSearchDirection.start.location.coordinates[0],
      lat : this.startSearchDirection.start.location.coordinates[1]
    }

    this.showLoader('Searching...');
    this.tripService.nearTrips(coordinates).then((result) => {
      this.loading.dismiss();
      this.nearTrips = result;
    }, (err) => {
      this.loading.dismiss();
    })
  }

  public showLoader(content){
    this.loading = this.loadingCtrl.create({
      content: content
    });
    this.loading.present();
  }

}
