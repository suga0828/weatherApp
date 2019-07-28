import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentWeatherService {

  public weatherSubject: Subject<any> = new Subject<any>();
  public $weather: Observable<any> = this.weatherSubject.asObservable();

  constructor(private http: HttpClient) {
    this.get();
  }

  get() {
    let observable = this.http.get('assets/weather.json').subscribe(this.weatherSubject);
  }
}
