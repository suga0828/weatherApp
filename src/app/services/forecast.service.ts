import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Coords } from '../interfaces/coords';
import { Weather } from '../interfaces/weather';
import { environment } from '../../environments/environment';

import { GeolocationService } from './geolocation.service';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  public weatherSubject: Subject<any> = new Subject<any>();
  public $weather: Observable<any>;

  api: string = 'forecast/';

  constructor(private http: HttpClient, private geolocationService: GeolocationService) {
    this.$weather = this.weatherSubject.asObservable()
      .pipe(
        map(this.structureData)
      )

    this.geolocationService.$coords
      .subscribe( (coords: Coords) => {
        this.get(coords);
      })
  }

  structureData(data: any) {
    let minMaxPerDay = {};
    data.list.forEach( weatherObject => {
      let date = new Date(weatherObject.dt * 1000);
      let hours = date.getHours();
      let month = date.getMonth() + 1;
      let day = date.getDate();

      let key = `${month}-${day}`;

      let tempPerDay = minMaxPerDay[key] || {
        minMaxTemp: {}
      } as Weather;

      if (!tempPerDay.cod || hours == 16) {
        let source = weatherObject.weather[0];
        tempPerDay = { ...tempPerDay, ...source };
        tempPerDay.cod = source.id;
        tempPerDay.name = data.city.name;
      }

      if (!tempPerDay.minMaxTemp.min || (tempPerDay.minMaxTemp.min > weatherObject.main.temp_min) ) {
        tempPerDay.minMaxTemp.min =  weatherObject.main.temp_min;
      }

      if (!tempPerDay.minMaxTemp.max || (tempPerDay.minMaxTemp.max < weatherObject.main.temp_max) ) {
        tempPerDay.minMaxTemp.max =  weatherObject.main.temp_max;
      }

      minMaxPerDay[key] = tempPerDay;
    });

    return Object.values(minMaxPerDay);
  }

  get(coords: Coords) {
    let args: string = `?lat=${coords.lat}&lon=${coords.lon}&appid=${environment.weatherKey}&units=metric`;
    let url = environment.weatherEndpoint + this.api + args;

    this.http.get(url).subscribe(this.weatherSubject);
  }
}
