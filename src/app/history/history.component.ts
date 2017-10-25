import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../shared/index';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk/collections';
import 'rxjs/add/observable/of';

import * as firebase from 'firebase';

export interface Data {}

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.sass']
})
export class HistoryComponent implements OnInit {
  private userId : string;
  public items: Observable<any[]>;
  public currentUid: string;

  constructor(private db: AngularFireDatabase, private authService: AuthService) { 
   
  }
  
  getIcon(percent: number) {
    if (percent >= 0.75)
      return "check";
    else
      return "clear";
  }

  getColor(percent: number) {
    if (percent >= 1)
      return "#4CAF50";
    else if (percent >= 0.75)
      return "#FF9800";
    else
      return "#FF5722";
  }

  ngOnInit() {
    console.log('init');
    this.currentUid = this.authService.getCurrentUid();
    this.items = this.db.list('items/' + this.currentUid).valueChanges();
    console.log(this.items);
  }

}
