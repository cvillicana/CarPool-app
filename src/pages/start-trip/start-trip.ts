import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, ViewController } from 'ionic-angular';
import { Trip } from '../../models/trip';

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
  public nextButtonText: string = "Next";
  public submitAttemp: boolean = false;

  public autocompleteStart: any;
  public autocompleteEnd: any;
  public optionsStart: any;
  public optionsEnd: any;

  public endTrip: any;
  public startTrip: any;
  public showSearchCityStart = true;
  public showSearchCityEnd = true;
  public dateTrip: any;
  public timeSelected: any;
  public today: string;
  public limitDay: string;
  public priceTrip: number;

  public newTrip: Trip;

  public passengersCount: number;

  constructor(
    public navCtrl: NavController,
    public FormBuilder: FormBuilder,
    public viewCtrl: ViewController) {

      this.passengersCount = 1;
      this.priceTrip = 10;

      this.dateTrip = moment().format();
      this.timeSelected = moment().format();

      this.today = moment().format();
      this.limitDay = moment(this.today).add('5','days').format('YYYY-MM-DD');

      this.autocompleteEnd = {
        query : ""
      }
      this.autocompleteStart = {
        query : ""
      }
      this.optionsEnd = {
        placeholder : "Where are you going?"
      }
      this.optionsStart = {
        placeholder : "Where are you from?"
      }
    }

  public next(): void{
    this.preButtonText = "Prev";
    if(!this.startTripSlider._isEnd){
      this.nextButtonText = this.startTripSlider.getActiveIndex() === 1 ? "Finish" : "Next";
      this.startTripSlider.slideNext();
    }else{
      this.newTrip = new Trip(this.startTrip, this.endTrip);
    }
  }

  public prev(): void{
    this.nextButtonText = "Next";
    this.preButtonText = this.startTripSlider.getActiveIndex() === 1 ? "Back" : "Prev";
    if(!this.startTripSlider._isBeginning){
      this.startTripSlider.slidePrev();
    }else{
      this.navCtrl.pop();
    }
  }

  public addPassenger(): number {
    if(this.passengersCount < 4)
      return this.passengersCount++;
  }

  public removePassenger(): number {
    if(this.passengersCount > 1)
      return this.passengersCount--;
  }

  public getSelectionEnd(selection: any): void{
    this.endTrip = selection;
    this.showSearchCityEnd = false;
  }

  public getSelectionStart(selection: any): void{
    this.startTrip = selection;
    this.showSearchCityStart = false;
  }

  public canGoNext(): boolean {
    if(this.showSearchCityStart || this.showSearchCityEnd)
      return false;
    return true;
  }

  public save(){

  }

}
