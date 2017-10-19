import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import * as firebase from 'firebase';

@Injectable() //Pour preciser que c'est un service

export class AuthService {
    constructor(private db: AngularFireDatabase) {
        
    }

    connectToDb(email: string, password: string, callback: any) {
        return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(success => callback())
        .catch(error => callback(error));
    }
}