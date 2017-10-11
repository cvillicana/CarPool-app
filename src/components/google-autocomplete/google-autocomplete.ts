import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GoogleMapsProvider } from '../../providers/google-maps/google-maps';

declare var google: any;

@Component({
  selector: 'google-autocomplete',
  templateUrl: 'google-autocomplete.html'
})

export class GoogleAutocompleteComponent implements OnInit {

  @Input() public autocomplete: any;
  @Input() public options: any;
  @Output() public itemSelected:  EventEmitter<any>;

  public autocompleteItems : any;
  public acService: any;
  public geoCodeService: any;

  constructor(public googleMapsService: GoogleMapsProvider) {
    this.itemSelected = new EventEmitter<any>();
    this.autocompleteItems = [];
  }

  ngOnInit(){
    this.acService = new google.maps.places.AutocompleteService();
    this.geoCodeService = new google.maps.Geocoder;
  }

  public clearSearch():void {
    this.autocompleteItems = [];
    this.autocomplete.query = "";
  }

  public select(item: any): void {
    this.clearSearch();
    this.googleMapsService.geocode(item.place_id).then((place) => {
      this.itemSelected.emit(place)
    }, (err) => {
      console.log(err);
    })
  }

  public updateGoogleSearch(){
    if (this.autocomplete.query == '' || this.autocomplete.query.length < 3) {
      this.autocompleteItems = [];
      return;
    }
    let config = {
      types:  ['(cities)'],
      input: this.autocomplete.query
    }
    this.googleMapsService.autocomplete(config).then((items) => {
      this.autocompleteItems = items;
    }, (err) =>{
      console.log(err);
    });
  }

}
