import { Injectable } from '@angular/core';

import { Coords } from '../interfaces/coords'

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  public $coords: Promise<Coords>;
  public $permission: Promise<string>;

  constructor() {
    this.$permission =  (navigator as any).permissions.query({ name: 'geolocation'})
                          .then( permissions => permissions.state )
  }

  requestGeolocation() {
    this.$coords = this.getGeolocation();
  }

  getGeolocation(): Promise<Coords> {
    return new Promise( (res, rej) => {
      if (!navigator || !('geolocation' in navigator)) return rej('Geolocation is not available');

      (navigator as any).geolocation.getCurrentPosition( position => {
        res({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
      });
    })
  }
}
