import { Component, OnInit } from '@angular/core';

import { showUpStraggeed } from '../animations/showUp.animation';

import { ForecastService } from '../services/forecast.service';

@Component({
  selector: 'app-forecast-weather',
  templateUrl: './forecast-weather.component.html',
  styleUrls: ['./forecast-weather.component.scss'],
  animations: [showUpStraggeed]
})
export class ForecastWeatherComponent implements OnInit {

  constructor(private forecastService: ForecastService) { }

  ngOnInit() { }

}
