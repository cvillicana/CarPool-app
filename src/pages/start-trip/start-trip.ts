import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, ViewController } from 'ionic-angular';

import moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-start-trip',
  templateUrl: 'start-trip.html',
})

export class StartTripPage{

  @ViewChild('startTripSlider') startTripSlider: any;


  public slideOneForm: FormGroup;
  public slideTwoForm: FormGroup;
  public preButtonText: string = "Back";
  public submitAttemp: boolean = false;

  public autocompleteWhere: any;
  public optionsWhere: any;
  public optionsFrom: any;
  public autocompleteFrom: any;

  public cityWhere: any;
  public showSearchCityWhere = true;
  public dateWhere: any;
  public timeSelected: any;
  public today: string;
  public limitDay: string;


  constructor(
    public navCtrl: NavController,
    public FormBuilder: FormBuilder,
    public viewCtrl: ViewController) {

      this.dateWhere = moment().format();
      this.timeSelected = moment().format();

      this.today = moment().format();
      this.limitDay = moment(this.today).add('5','days').format('YYYY-MM-DD');

      this.autocompleteWhere = {
        query : ""
      }
      this.autocompleteFrom = {
        query : ""
      }
      this.optionsWhere = {
        placeholder : "Where are you going?"
      }
      this.optionsFrom = {
        placeholder : "Where are you from?"
      }
    }

  public next(): void{
    this.preButtonText = "Prev";
    this.startTripSlider.slideNext();
  }

  public getSelection(selection: any): void{
    this.cityWhere = selection;
    this.showSearchCityWhere = false;
  }

  public prev(): void{
    this.preButtonText = this.startTripSlider.getActiveIndex() === 1 ? "Back" : "Prev";
    if(!this.startTripSlider._isBeginning){
      this.startTripSlider.slidePrev();
    }else{
      this.navCtrl.pop();
    }
  }

  public save(){

  }

}
