import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';

import { Upload } from './upload';

import * as firebase from 'firebase/app';

@Injectable()
export class UploadService {

  private basePath = '/statements';

  constructor(private db: AngularFireDatabase, private afs: AngularFirestore) { }

  pushFileToStorage(fileUpload: Upload, progress: { percentage: number }, currentUid: string, results: string, percent: number) {

    console.log('fileUpload:', fileUpload)

    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${fileUpload.file.name.replace(/(\.[\w\d_-]+)$/i, (Math.floor(Math.random() * 1000) + 1).toString())}`).put(fileUpload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => { // in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot
        progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100)
      },
      (error) => { // fail
        console.log(error);
      },
      () => { // success
        fileUpload.url = uploadTask.snapshot.downloadURL;
        fileUpload.name = fileUpload.file.name;
        fileUpload.createdAt = new Date();
        //this.saveFileData(fileUpload, currentUid, results, percent);


      }
    );
  }

  saveFileData(fileUpload: Upload, currentUid: string, results: string, percent: number) {

    this.db.list(`${this.basePath}/` + currentUid).push({
      image: fileUpload,
      results: results,
      date: Date(),
      percent: percent
    });
  }

}