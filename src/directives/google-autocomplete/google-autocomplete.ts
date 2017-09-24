import { Directive } from '@angular/core';
import { OnInit } from '@angular/core';

declare var google: any;

@Directive({
  selector: '[google-autocomplete]'
})
export class GoogleAutocompleteDirective implements OnInit {

  public autocompleteItems : any;
  public autocomplete: any;
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
