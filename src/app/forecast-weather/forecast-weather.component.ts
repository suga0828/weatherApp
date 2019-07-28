import { Component, OnInit } from '@angular/core';

import { ForecastService } from '../services/forecast.service';

@Component({
  selector: 'app-forecast-weather',
  templateUrl: './forecast-weather.component.html',
  styleUrls: ['./forecast-weather.component.scss']
})
export class ForecastWeatherComponent implements OnInit {

  constructor(private forecastService: ForecastService) { }

  ngOnInit() {
    this.forecastService.$weather.subscribe(console.log);
  }

}
