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
  
  ngOnInit() {
    console.log('init');
    this.currentUid = this.authService.getCurrentUid();
    this.items = this.db.list('items/' + this.currentUid).valueChanges();
    console.log(this.items);
  }

}
