import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, ViewController, LoadingController } from 'ionic-angular';
import { TripProvider } from '../../providers/trip/trip';

import { OptionsTrip } from '../../models/optionsTrip';
import { Trip } from '../../models/trip';

import moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-start-trip',
  templateUrl: 'start-trip.html',
})

export class StartTripPage{

  @ViewChild('startTripSlider') startTripSlider: any;

  public loading: any;

  public preButtonText: string = "Back";
  public nextButtonText: string = "Next";
  public submitAttemp: boolean = false;

  public autocompleteStart: any;
  public autocompleteEnd: any;
  public optionsStart: any;
  public optionsEnd: any;

  public endTrip: any;
  public startTrip: any;
  public today: string;
  public limitDay: string;

  public newTrip: Trip;
  public optionsTrip: OptionsTrip;

  constructor(
    public navCtrl: NavController,
    public FormBuilder: FormBuilder,
    public viewCtrl: ViewController,
    public tripService: TripProvider,
    public loadingCtrl: LoadingController) {

      this.today = moment().format();
      this.limitDay = moment(this.today).add('5','days').format('YYYY-MM-DD');

      this.optionsTrip = new OptionsTrip();

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
      if(this.startTripSlider.getActiveIndex() === 1){
        this.nextButtonText = "Finish";
        this.newTrip = new Trip(this.startTrip, this.endTrip, this.optionsTrip);
      }
      this.startTripSlider.slideNext();
    }else{
      this.finish(this.newTrip);
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
    if(this.optionsTrip.passengers < 4)
      return this.optionsTrip.passengers++;
  }

  public removePassenger(): number {
    if(this.optionsTrip.passengers > 1)
      return this.optionsTrip.passengers--;
  }

  public getSelectionEnd(selection: any): void{
    this.endTrip = selection;
  }

  public getSelectionStart(selection: any): void{
    this.startTrip = selection;
  }

  public canGoNext(): boolean {
    if(!this.startTrip || !this.endTrip)
      return false;
    return true;
  }

  public finish(trip){
    if(!trip){
      return;
    }
    this.showLoader('Creating...');
    this.tripService.createTrip(trip).then((result) =>{
      this.loading.dismiss();
    }, (err) => {
      this.loading.dismiss();
    });
  }

  public showLoader(content){
    this.loading = this.loadingCtrl.create({
      content: content
    });
    this.loading.present();
  }

}
