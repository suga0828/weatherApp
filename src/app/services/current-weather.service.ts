import { Injectable, isDevMode } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Subject, Observable } from 'rxjs';

import { Coords } from '../interfaces/coords';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CurrentWeatherService {

  public weatherSubject: Subject<any> = new Subject<any>();
  public $weather: Observable<any> = this.weatherSubject.asObservable();

  constructor(private http: HttpClient) {
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
