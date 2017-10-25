// MODULE
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import { routing } from './app-routing.module'; 

// SERVICE
import { environment } from '../environments/environment';
import { AuthService } from './shared/auth.service';
import { GoogleCloudVisionService } from './shared/google-cloud-vision.service';
import { AuthGuard } from './shared/auth.guard';
import { UploadService } from './shared/upload.service';

// COMPONENT
import { AppComponent } from './app.component';
import { SignInComponent } from './signin/signin.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found.component';
import { SignUpComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { ContactComponent } from './contact/contact.component';
import { DeclarationComponent } from './declaration/declaration.component';
import { HistoryComponent } from './history/history.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    HomeComponent,
    NotFoundComponent,
    SignUpComponent,
    ProfileComponent,
    ContactComponent,
    DeclarationComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    SharedModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    routing
  ],
  providers: [AuthGuard, 
              AuthService, 
              AngularFireDatabase, 
              GoogleCloudVisionService,
              UploadService
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
