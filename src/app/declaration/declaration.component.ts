import { Component, OnInit } from '@angular/core';
import { GoogleCloudVisionServiceService } from '../shared/google-cloud-vision-service.service';
import { AuthService } from '../shared/index';
import { UploadService } from '../shared/upload.service';
import { Upload } from '../shared/upload';

import * as firebase from 'firebase';

@Component({
  selector: 'app-declaration',
  templateUrl: './declaration.component.html',
  styleUrls: ['./declaration.component.sass']
})
export class DeclarationComponent implements OnInit {
  private storageRef;
  public selectedFiles: FileList;
  public currentFileUpload: Upload;
  public progress: {percentage: number} = {percentage: 0};
  public currentUid;
  public onAnalyzed: boolean = false;
  public fileChosen: string = "";
  public isAnalyzed: boolean = false;
  public fileAnalyzedpercent: number;
  public fileAnalyzedName: string;
  public fileAnalyzedUrl: string;
  public fileAnalyzedDate: string;

  constructor(private authService: AuthService, 
              private vision: GoogleCloudVisionServiceService,
              private uploadService: UploadService) { }

  selectFile(event) {
    this.selectedFiles = event.target.files;
    this.fileChosen = this.selectedFiles.item(0).name;
  }

  upload(event) {
    this.onAnalyzed = true;
    const file = this.selectedFiles.item(0);
    this.currentFileUpload = new Upload(file);

    let reader = new FileReader();
      console.log('file:', file)
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.vision.getLabels(reader.result.split(',')[1]).subscribe(response => {

          console.log(response.json().responses);
          this.fileAnalyzedpercent = this.analyzePicture(response.json().responses);
          this.uploadService.pushFileToStorage(this.currentFileUpload, this.progress, this.currentUid, response.json().responses, this.fileAnalyzedpercent);
          this.fileAnalyzedName = file.name;
          console.log("URL : " + this.fileAnalyzedUrl);
          this.isAnalyzed = true;
        });
      }; 
  }

  analyzePicture(results: string) {
    return 0;
  }

  ngOnInit() {
    this.currentUid = this.authService.getCurrentUid();
    this.storageRef = firebase.storage().ref();    
  }

}
