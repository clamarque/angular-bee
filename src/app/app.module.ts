import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
//import { AngularFireDatabaseModule, AngularFireDatabase, AngularFireList } from 'angularfire2/database';
//import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

import { AppComponent } from './app.component';

import * as firebase from 'firebase/app';

import { environment } from '../environments/environment';
import { AuthService } from './shared/auth.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase, 'angular-bee'),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
