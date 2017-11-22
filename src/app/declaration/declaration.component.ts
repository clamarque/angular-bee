import { Component, OnInit, Input,ViewChild, AfterViewInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { GoogleCloudVisionService } from '../shared/google-cloud-vision.service';
import { AuthService, SharedModule } from '../shared/index';
import { UploadService } from '../shared/upload.service';
import { Upload } from '../shared/upload';

import * as firebase from 'firebase';

import { GoogleMapComponent } from '../google-map/google-map.component';

@Component({
  selector: 'app-declaration',
  templateUrl: './declaration.component.html',
  styleUrls: ['./declaration.component.sass']
})
export class DeclarationComponent implements OnInit {
  public selectedFiles: FileList;
  public currentFileUpload: Upload;
  public progress: {percentage: number} = {percentage: 0};
  public currentUid;
  public onAnalyzed: boolean = false;
  public fileChosen: string = "";
  public isAnalyzed: boolean = false;
  public isUpload: boolean = false;
  public fileAnalyzedpercent: number;
  public fileAnalyzedName: string;
  public fileAnalyzedUrl: string;
  public fileAnalyzedDate: string;
  public items: any[];

  

  @ViewChild('form') form;

  constructor(private authService: AuthService, 
              private vision: GoogleCloudVisionService,
              private uploadService: UploadService,
              private _formBuilder: FormBuilder) { }

  selectFile(event) {
    this.selectedFiles = event.target.files;
    console.log('selectedfiles', this.selectedFiles)
    this.fileChosen = this.selectedFiles.item(0).name;
  }

  upload(event) {
    console.log('event upload',event)
    this.onAnalyzed = true;
    this.isUpload = true;
    const file = this.selectedFiles.item(0);
    console.log('file', file)
    
    this.currentFileUpload = new Upload(file);
    
    let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.vision.getLabels(reader.result.split(',')[1]).subscribe(response => {

          this.fileAnalyzedName = file.name;
          this.fileAnalyzedpercent = this.analyzePicture(response.json().responses);
          this.uploadService.pushFileToStorage(this.currentFileUpload, this.progress, this.currentUid, response.json().responses, this.fileAnalyzedpercent);          
          console.log("URL : " + this.fileAnalyzedUrl);
          this.isAnalyzed = true;

          // RESET INPUT FILE
          this.form.nativeElement.reset();
          this.onAnalyzed = false;          
          this.selectedFiles = null;
          this.fileChosen = "";
        });
      };
  }

  analyzePicture(results) {
    var maxScore = 0;
    this.items = [];
    if (results[0].webDetection && results[0].webDetection.webEntities) {
      for (let detection of results[0].webDetection.webEntities) {
        if (detection.score && detection.description) {
          this.items.push(detection);
           if (detection.description.indexOf("Asian predatory wasp") >= 0
              || detection.description.indexOf("Asian giant hornet") >= 0) {
            if (detection.score >= maxScore) { // A CREUSER
              maxScore = detection.score
            }  
          }
        }
      }
    }
    return maxScore;
  }

  getIcon() {
    if (this.fileAnalyzedpercent >= 0.75)
      return "check";
    else
      return "clear";
  }

  getColor() {
    if (this.fileAnalyzedpercent >= 1)
      return "#4CAF50";
    else if (this.fileAnalyzedpercent >= 0.75)
      return "#FF9800";
    else
      return "#FF5722";
  }

  convertScore(score: number) {
    if (score >= 1)
      return 100
    else
      return Math.round(score * 100)
  }


  ngOnInit() {

  
  }
}
