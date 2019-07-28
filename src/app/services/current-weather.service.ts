import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Coords } from '../interfaces/coords';
import { Weather } from '../interfaces/weather';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CurrentWeatherService {

  public weatherSubject: Subject<any> = new Subject<any>();
  public $weather: Observable<any>;

  constructor(private http: HttpClient) {
    this.$weather = this.weatherSubject.asObservable()
      .pipe(
        map( (data: any) => {
          let mainWeather = data.weather[0];
          let weather: Weather =  {
            name: data.name,
            cod: data.cod,
            temp: data.main.temp,
            ...mainWeather
          }

          return weather
        })
      );

    this.get({
      lat: 4.606880,
      lon: -74.071838
    });
  }

  get(coords: Coords) {
    let args: string = `?lat=${coords.lat}&lon=${coords.lon}}&appid=${environment.weatherKey}&units=metric`;
    let url = environment.weatherEndpoint + args;

    if (isDevMode()) {
      url = 'assets/weather.json';
    }

    this.http.get(url).subscribe(this.weatherSubject);
  }
}
