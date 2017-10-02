import { OptionsTrip } from './optionsTrip'

export class Trip{

  start: any
  end: any
  distance: number
  options: OptionsTrip

  constructor(
    start: any,
    end: any,
    options: OptionsTrip
  ){
      this.start = start;
      this.start.city = start.formatted_address;
      this.start.location = { coordinates: [start.geometry.location.lng(), start.geometry.location.lat()]}

      this.end = end;
      this.end.city = end.formatted_address;
      this.end.location = { coordinates: [end.geometry.location.lng(), end.geometry.location.lat()]}

      this.distance = this.getDistance();
      this.options = options;
  }

  private rad(x): number{
    return x * Math.PI / 180;
  }

  public getDistance(): number{
    var R = 6378137;
    var dLat = this.rad(this.end.location.coordinates[1] - this.start.location.coordinates[1]);
    var dLong = this.rad(this.end.location.coordinates[0] - this.start.location.coordinates[0]);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.rad(this.start.location.coordinates[1])) * Math.cos(this.rad(this.end.location.coordinates[1])) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    d = Math.round(d/1000);
    return d;
  }

}
