import { Component, OnInit } from '@angular/core';

import { GeolocationService } from './services/geolocation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'weatherApp';

  constructor(private geolocationService: GeolocationService) { }

  ngOnInit() { }
}
