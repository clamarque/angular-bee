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
import { AuthService } from './shared/auth.service';
import { GoogleCloudVisionService } from './shared/google-cloud-vision.service';
import { AuthGuard } from './shared/guard/auth.guard';
import { UploadService } from './shared/upload.service';
import { GeoService } from './shared/geo.service';

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
import { NestComponent } from './nest/nest.component';
import { FooterComponent } from './footer/footer.component';
import { GoogleMapComponent } from './google-map/google-map.component';
import { GoogleVisionComponent } from './google-vision/google-vision.component';
import { FileSelectorDirective } from './shared/directives/file-selector.directive';

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
    HistoryComponent,
    NestComponent,
    FooterComponent,
    GoogleMapComponent,
    GoogleVisionComponent,
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
  bootstrap: [AppComponent]
})
export class AppModule { }
