import moment from 'moment';

export class OptionsTrip {

  passengers:number
  price:number
  date:string

  constructor(){
    this.passengers = 1;
    this.price = 20;
    this.date = moment().format();
  }

}
