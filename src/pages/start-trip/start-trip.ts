import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-start-trip',
  templateUrl: 'start-trip.html',
})

export class StartTripPage{

  @ViewChild('startTripSlider') startTripSlider: any;

  public showSearchCity = true;

  public slideOneForm: FormGroup;
  public slideTwoForm: FormGroup;
  public preButtonText: string = "Back";
  public submitAttemp: boolean = false;

  public citySelected : any;
  public autocompleteQuery: string;


  constructor(
    public navCtrl: NavController,
    public FormBuilder: FormBuilder,
    public viewCtrl: ViewController) {}

  // public chooseItem(item: any){
  //   this.clearSearch();
  //   this.citySelected = item;
  //   this.showSearchCity = false;
  // }

  public next(){
    this.preButtonText = "Prev";
    this.startTripSlider.slideNext();
  }

  public prev(){
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
