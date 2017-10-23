import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import * as firebase from 'firebase';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.sass']
})
export class HistoryComponent implements OnInit {
  private userId : string;

  constructor(private db: AngularFireDatabase) { 
    this.userId = firebase.auth().currentUser.uid;   
    console.log("UserId : " + this.userId); 

    firebase.database().ref('/items/' + this.userId).once('value').then(function(snapshot) {
      console.log(snapshot.val());
      // ...
    });
  }

  ngOnInit() {
  }

}
