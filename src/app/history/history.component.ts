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

  myData: Array <any>;
  dataSource: MyDataSource;

  private displayedColumns = ['position', 'name', 'weight'];

  constructor(private db: AngularFireDatabase, private authService: AuthService) { 
   
  }

  public getData() {
    this.items
      .subscribe(res => {
        this.myData = res;
        this.dataSource = new MyDataSource(this.myData);
      });
  }
  
  ngOnInit() {
    console.log('init');
    this.currentUid = this.authService.getCurrentUid();
    this.items = this.db.list('items/' + this.currentUid).valueChanges();;
    //this.items = this.authService.getResult().valueChanges();
    console.log(this.items);
    this.getData();
  }

}

export class MyDataSource extends DataSource<any> {
  constructor(private data: Data[]) {
    super();
  }
   /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Data[]> {
    return Observable.of(this.data);
  }

  disconnect() {}

  }