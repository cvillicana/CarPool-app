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
      this.end = end;
      this.distance = this.getDistance();
      this.options = options;
  }

  private rad(x): number{
    return x * Math.PI / 180;
  }

  public getDistance(): number{
    var R = 6378137;
    var dLat = this.rad(this.end.geometry.location.lat() - this.start.geometry.location.lat());
    var dLong = this.rad(this.end.geometry.location.lng() - this.start.geometry.location.lng());
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.rad(this.start.geometry.location.lat())) * Math.cos(this.rad(this.end.geometry.location.lat())) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    d = Math.round(d/1000);
    return d;
  }

}
