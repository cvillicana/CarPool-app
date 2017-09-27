import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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
  public selection: any;

  constructor() {
    this.itemSelected = new EventEmitter<any>();
  }

  ngOnInit(){
    this.acService = new google.maps.places.AutocompleteService();
    this.autocompleteItems = [];
  }

  public clearSearch():void {
    this.autocompleteItems = [];
    this.autocomplete.query = "";
  }

  public select(item: any): void {
    this.clearSearch();
    this.itemSelected.emit(item);
    this.selection = item;
  }

  public getSelection(): any {
   return this.selection;
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
