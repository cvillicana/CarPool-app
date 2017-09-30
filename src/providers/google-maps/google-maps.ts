import { Injectable, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
declare var google: any;

@Injectable()
export class GoogleMapsProvider{

  public acService: any;
  public geoCodeService: any;
  public autocompleteItems: any;

  constructor() {
    this.acService = new google.maps.places.AutocompleteService();
    this.geoCodeService = new google.maps.Geocoder;
    this.autocompleteItems = [];
  }

  public autocomplete(data): any{
    let items = [];
    return new Promise((resolve,reject) => {
      this.acService.getPlacePredictions(data, function (predictions, status) {
        if(predictions && status === 'OK'){
          predictions.forEach(function (prediction) {
            items.push(prediction);
          });
          resolve(items);
        }
        reject(status);
      });
    })
  }

  public geocode(placeId): any{
    return new Promise((resolve, reject) => {
      this.geoCodeService.geocode({'placeId':placeId}, function(results, status){
        if(status === 'OK'){
          if(results[0]){
            resolve(results[0]);
          }
          reject(status);
        }
        reject(status);
      })
    })
  }

}
