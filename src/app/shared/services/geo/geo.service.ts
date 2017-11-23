import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseApp } from 'angularfire2';

import * as GeoFire from 'geofire';
import * as firebase from 'firebase/app';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Injectable()
export class GeoService {

 dbRef: any;
 geoFire: any;
 hits = new BehaviorSubject([])
 
  constructor(private db: AngularFireDatabase) {
    // Reference database location for GeoFire
    //let afRef:any = this.db.database();
    const firebaseRef = firebase.database().ref().child('locations');
    this.geoFire = new GeoFire(firebaseRef);
    //this.dbRef = this.db.list('/locations').ref();
    //this.geoFire = new GeoFire(this.dbRef);
   }

   // Adds GeoFire data to database
   setLocation(key: string, coords: Array<number>) {
     this.geoFire.set(key, coords)
      .then(_=> console.log('location updated'))
      .catch(err => console.log(err))
   }

   // Queries database for nearby locations
   // Maps results to the hits BehaviorSubject


   getLocations(radius: number, coords: Array<number>) {
    this.geoFire.query({
      center: coords,
      radius: radius
    })

    //this.hits.next(currentHits);
    .on('key_entered', (key, location, distance) => {
      console.log('are you on on function ?')
      let hit = {
        location: location,
        distance: distance
      }
      let currentHits = this.hits.value
      currentHits.push(hit)
      this.hits.next(currentHits)
    })
   }

}
