import { Component, OnInit, Input } from '@angular/core';

declare var google: any;

@Component({
  selector: 'google-autocomplete',
  templateUrl: 'google-autocomplete.html'
})

export class GoogleAutocompleteComponent implements OnInit {

  @Input() public autocomplete: any;

  public autocompleteItems : any;
  public acService: any;

  constructor() {
  }

  ngOnInit(){
    this.acService = new google.maps.places.AutocompleteService();
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };
  }

  public dismissSearch(){
  }

  public clearSearch(){
    this.autocompleteItems = [];
    this.autocomplete.query = "";
  }

  public updateGoogleSearch(){
    if (this.autocomplete.query == '') {
      this.autocompleteItems = [];
      return;
    }
    let self = this;
    let config = {
      types:  ['geocode'],
      input: this.autocomplete.query
    }
    this.acService.getPlacePredictions(config, function (predictions, status) {
      self.autocompleteItems = [];
      if(predictions){
        predictions.forEach(function (prediction) {
          self.autocompleteItems.push(prediction);
        });
      }
    });
  }

}
