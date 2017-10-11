export class SearchTrip{

  start: any;

  constructor(
    start:any
  ){
    this.start = start;
    this.start.location = { coordinates: [start.geometry.location.lng(), start.geometry.location.lat()] };
  }
}
