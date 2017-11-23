// MODULE
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { AgmCoreModule } from '@agm/core';

import { routing } from './app-routing.module'; 

// SERVICE
import { environment } from '../environments/environment';
import { AuthGuard, AuthService, GoogleCloudVisionService, GeoService, UploadService } from './shared/index';

// COMPONENT
import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { DeclarationComponent } from './declaration/declaration.component';
import { DialogConfirme } from './nest/nest.component';
import { FooterComponent } from './footer/footer.component';
import { GoogleMapComponent } from './google-map/google-map.component';
import { GoogleVisionComponent } from './google-vision/google-vision.component';
import { HistoryComponent } from './history/history.component';
import { HomeComponent } from './home/home.component';
import { NestComponent } from './nest/nest.component';
import { NotFoundComponent } from './not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { SignInComponent } from './signin/signin.component';
import { SignUpComponent } from './signup/signup.component';

// DIRECTIVE
import { FileSelectorDirective } from './shared/directives/file-selector.directive';

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    DeclarationComponent,
    DialogConfirme,
    FooterComponent,
    GoogleMapComponent,
    GoogleVisionComponent,
    HomeComponent,
    HistoryComponent,
    NestComponent,
    NotFoundComponent,
    ProfileComponent,
    SignInComponent,
    SignUpComponent,
    FileSelectorDirective
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDcObEbkYSeM9kCU2Edq5rQug0nUGvJoAI',
      libraries: ['places']
    }),
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    SharedModule,
    ReactiveFormsModule,
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
              UploadService,
              GeoService
            ],
  entryComponents: [
    DialogConfirme
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
