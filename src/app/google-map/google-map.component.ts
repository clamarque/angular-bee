import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { GeoService } from '../shared/index';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})

export class GoogleMapComponent implements OnInit {
  private location: any = [];  
  lat: number;
  lng: number;
  markers: any;
  subscription: any;

  @Output() latitude: EventEmitter<number> = new EventEmitter<number>();
  @Output() longitude: EventEmitter<number> = new EventEmitter<number>();
  @Output() placeLocation = new EventEmitter();

  constructor(private geo: GeoService) { }

  /*
   * Get the position of user
   */
  getUserLocation() {
    if (navigator.geolocation) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;

          this.location.push({
            latitude: this.lat,
            longitude: this.lng
          });
          console.log(this.location);

          this.latitude.emit(this.lat);
          this.longitude.emit(this.lng);
          this.placeLocation.emit(this.location);

          this.geo.getLocations(100, [this.lat, this.lng])
        })
      }
    }
  }

  private seedDatabase() {
    let dummyPoints = [
      [37.9, -122.1],
      [38.7, -122.2],
      [38.1, -122.3],
      [38.3, -122.0],
      [38.7, -122.1]
    ]
    dummyPoints.forEach((val, idx) => {
      let name = `dummy-location-${idx}`
      console.log(idx)
      this.geo.setLocation(name, val)
    })
  }

  ngOnInit() {
    //this.seedDatabase();
    //this.getUserLocation();
    this.subscription = this.geo.hits.subscribe(hits => {
      console.log('hits: ', hits)
      this.markers = hits
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
