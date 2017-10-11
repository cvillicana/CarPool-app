import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';

import { SearchTrip } from '../../models/searchTrip';


@IonicPage()
@Component({
  selector: 'page-search-trip',
  templateUrl: 'search-trip.html',
})
export class SearchTripPage {

  public autocompleteStart: any;
  public startSearchDirection: any;
  public optionsStart: any;

  constructor(public navCtrl: NavController) {
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

}
