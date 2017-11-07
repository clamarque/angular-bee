import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GoogleCloudVisionService } from '../shared/google-cloud-vision.service';
import { AuthService, SharedModule } from '../shared/index';
import { UploadService } from '../shared/upload.service';
import { Upload } from '../shared/upload';

import * as firebase from 'firebase';

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
  public fileAnalyzedpercent: number;
  public fileAnalyzedName: string;
  public fileAnalyzedUrl: string;
  public fileAnalyzedDate: string;
  public items: any[];
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;



  @ViewChild('form') form;

  constructor(private authService: AuthService, 
              private vision: GoogleCloudVisionService,
              private uploadService: UploadService,
              private _formBuilder: FormBuilder) { }

  selectFile(event) {
    this.selectedFiles = event.target.files;
    this.fileChosen = this.selectedFiles.item(0).name;
  }

  upload(event) {
    this.onAnalyzed = true;
    const file = this.selectedFiles.item(0);
    console.log('file', file)
    
    /*if(file.toString().match(/\.(jpg|png|gif)$/)) {
      this.currentFileUpload = new Upload(file);
    }
    else {
      console.log('error import img')
    } */

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

  // A quoi sert cette fonction ? Je comprends bien que cela analyse le score de correspondance d une guepe
  // Mais pq tu n utilises pas deja la variable item.score ?
  
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
    this.currentUid = this.authService.getCurrentUid();

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  submit(data) {
    console.log('data', data)
  }

}
