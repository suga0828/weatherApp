import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { WeatherIconComponent } from './weather-icon/weather-icon.component';
import { WeatherCardComponent } from './weather-card/weather-card.component';
import { ForecastWeatherComponent } from './forecast-weather/forecast-weather.component';
import { LoadingComponent } from './loading/loading.component';
import { GeolocationButtonComponent } from './geolocation-button/geolocation-button.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrentWeatherComponent,
    WeatherIconComponent,
    WeatherCardComponent,
    ForecastWeatherComponent,
    LoadingComponent,
    GeolocationButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
