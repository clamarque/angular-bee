import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase  } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

import * as firebase from 'firebase';

export class AdDeclaration {
    image = "http://via.placeholder.com/350x150"
    name = "Your name"
    email = "example@gmail.com"
    phone = "00.00.00.00.00"
    comments = "this is a comments"
}


@Injectable() //Pour preciser que c'est un service

export class AuthService {
    public uid: string = '';

    constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) {
        this.afAuth.authState.subscribe(auth => {
            if (auth != null) this.uid = auth.uid
        })

    }

    createAccount(email: string, password: string, callback: any) {
        return firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(success => callback())
            .catch(error => callback(error));
    }

    createDeclaration(data: any, callback: any) {
        return this.db.list('declarations-auth').push({ data})
           .then(success => callback())
    }

    createDeclarationLogged(data: any, callback: any) {
        
    }

    setDeclaration() {
        let KeyArray = []
        firebase.database().ref('items').once('value', data => {
        

        })
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

    getCurrentUid() {
        return this.uid;
    }

    /*createAd() : <AdDeclaration> {
        const adDefault = new AdDeclaration();
        const adKey = this.db.list('/declarations').push(adDefault).key;
        return this.db.object('/declarations/' + adKey)
    }*/
}