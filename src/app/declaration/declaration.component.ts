import { Component, OnInit } from '@angular/core';
import { GoogleCloudVisionServiceService } from '../shared/google-cloud-vision-service.service';
import { AuthService } from '../shared/index';
import { UploadService } from '../shared/upload.service';
import { Upload } from '../shared/upload';
import { Observable } from 'rxjs/Observable';

import * as firebase from 'firebase';

@Component({
  selector: 'app-declaration',
  templateUrl: './declaration.component.html',
  styleUrls: ['./declaration.component.sass']
})
export class DeclarationComponent implements OnInit {
  public items: Observable<any[]>;
  private storageRef;
  public selectedFiles: FileList;
  public currentFileUpload: Upload;
  public progress: {percentage: number} = {percentage: 0};
  public currentUid;

  constructor(private authService: AuthService, 
              private vision: GoogleCloudVisionServiceService,
              private uploadService: UploadService) { }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload(event) {
    const file = this.selectedFiles.item(0);
    this.currentFileUpload = new Upload(file);

    let reader = new FileReader();
      console.log('file:', file)
      reader.readAsDataURL(file);
      reader.onload = () => {
 
        this.vision.getLabels(reader.result.split(',')[1]).subscribe(response => {

          console.log(response.json().responses);
          this.uploadService.pushFileToStorage(this.currentFileUpload, this.progress, this.currentUid, response.json().responses);


          //this.authService.saveResult(reader.result.split(',')[1], response.json().responses);
        })
      }; 
    
  }

  ngOnInit() {
    this.currentUid = this.authService.getUid();

    console.log('init')
    this.items = this.authService.getResult().valueChanges();

    console.log('items', this.items)
    this.storageRef = firebase.storage().ref();    
  }

}
