import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Upload } from './upload';

import * as firebase from 'firebase/app';

@Injectable()
export class UploadService {

  private basePath = '/items';

  constructor(private db: AngularFireDatabase) { }

   pushFileToStorage(fileUpload: Upload, progress: {percentage: number}, currentUid: string, results: string) {
     const storageRef = firebase.storage().ref();
     const uploadTask = storageRef.child(`${this.basePath}/${fileUpload.file.name}`).put(fileUpload.file);
  
     uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
       (snapshot) => {
         // in progress
         const snap = snapshot as firebase.storage.UploadTaskSnapshot
         progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100)
       },
       (error) => {
         // fail
         console.log(error)
       },
       () => {
         // success
         fileUpload.url = uploadTask.snapshot.downloadURL;
         fileUpload.name = fileUpload.file.name;
         fileUpload.createdAt = new Date();         
         this.saveFileData(fileUpload, currentUid, results)
       }
     );
  }
  
    private saveFileData(fileUpload: Upload, currentUid: string, results: string) {
      //this.db.list(`${this.basePath}/`).push(fileUpload);

      this.db.list(`${this.basePath}/` + currentUid).push({
          image: fileUpload,
          results: results
      });
    }
}
