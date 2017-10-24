import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';

import * as firebase from 'firebase';

@Injectable() //Pour preciser que c'est un service

export class AuthService {
    public uid: string = '';

    constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
        this.afAuth.authState.subscribe(auth => {
            if (auth != null) this.uid = auth.uid
        })

    }

    createAccount(email: string, password: string, callback: any) {
        return firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(success => callback())
            .catch(error => callback(error));
    }

    getCurrentEmail() {
        return firebase.auth().currentUser;
    }

    connectToDb(email: string, password: string, callback: any) {
        return firebase.auth().signInWithEmailAndPassword(email, password)
            .then(success => callback())
            .catch(error => callback(error));
    }

    connectToG(callback: any) {
        return firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider);
    }

    changePassword(password: string, callback: any) {
        return this.afAuth.auth.currentUser.updatePassword(password)
            .then(success => callback())
            .catch(error => callback(error));
    }


    isLoggin() {
        return this.afAuth.authState.map(auth => {
            return auth != null ? true : false;
        });
    }


    logout() {
        return this.afAuth.auth.signOut();
    }
    
    getResult() {
        return this.db.list('items/' + this.uid);
    }

    saveResult(image,results) {
        return this.db.list('items/' + this.uid).push({
            imageDate: image,
            results: results
        })
    }

}