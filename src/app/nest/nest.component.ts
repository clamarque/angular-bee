import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AuthService, GoogleCloudVisionService, UploadService } from '../shared/index';
import { Upload } from '../shared/services/upload/upload';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-nest',
  templateUrl: './nest.component.html',
  styleUrls: ['./nest.component.sass']
})
export class NestComponent implements OnInit {
  currentId: string = '';
  currentFileUpload: Upload;
  fileAnalyzedpercent: number;
  isConnected: boolean = false;
  isBeginning: boolean = false;
  isSetLocation: boolean = true;
  isStart: boolean = true;
  items: any[];
  pictures = [];
  progress: {percentage: number} = {percentage: 0};
  formGroup: FormGroup;

  constructor(private authService: AuthService, private dialog: MatDialog, private vision: GoogleCloudVisionService, private _formBuilder: FormBuilder, private uploadService: UploadService) { }

  get formArray(): AbstractControl | null { return this.formGroup.get('formArray') };

  confirmDialog() {
    let dialogRef = this.dialog.open(DialogConfirme);

    dialogRef.afterClosed().subscribe(result => {
     console.log('result', result)
     if(result == 'yes') {
       console.log('result', this.formGroup.value)
       // send data to firebase from service
       // redirect to home or the home of declaration of the nest

     } 
     else console.log('no push data')
    })
  }
  step1() {
    this.isBeginning = true;
    this.isStart = false;
  }

  setLocation() {
    this.isSetLocation = false;
  }

  handleFileSelected(files) {
    console.log(files)
    if (files.length > 0) {
      for (let file of files) {
        // https://stackoverflow.com/questions/39229398/how-to-update-controls-of-formarray
        // set value picture        
        const control = (<FormArray>this.formGroup.controls['formArray']).at(0).patchValue({
          picture: file.name
        });

        this.currentFileUpload = new Upload(file);

        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.vision.getLabels(reader.result.split(',')[1]).subscribe(response => {
  
            //this.fileAnalyzedName = file.name;
            this.fileAnalyzedpercent = this.analyzePicture(response.json().responses);
            console.log('File analyse %', this.fileAnalyzedpercent);
            //this.uploadService.pushFileToStorage(this.currentFileUpload, this.progress, this.currentId, response.json().responses, this.fileAnalyzedpercent);          
            //console.log("URL : " + this.fileAnalyzedUrl);
            //this.isAnalyzed = true;
  
            // RESET INPUT FILE
            //this.form.nativeElement.reset();
            //this.onAnalyzed = false;          
            //this.selectedFiles = null;
            //this.fileChosen = "";
          });
        };



      }
    }
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

  handleLocation(location) {
    console.log(location);
    if (location.length > 0) {
      for (let locate of location) {
        const control = (<FormArray>this.formGroup.controls['formArray']).at(0).patchValue({
          latitude: locate.latitude,
          longitude: locate.longitude
        })
      }
    }
  }


  onSubmit() {
    if (this.formGroup.status != 'VALID') console.log('form is not valid')
    else {
      //console.log('data: ', this.formGroup.value, 'pictures:', this.pictures)
      //this.confirmDialog(this.formGroup.value);
    }
  }


  ngOnInit() {
    this.authService.isLoggin().subscribe(authStatus => { return authStatus === true ? this.isConnected = true : this.isConnected = false; })
    this.currentId = this.authService.getCurrentUid();
    console.log('currentId', this.currentId);


    this.formGroup = this._formBuilder.group({
      formArray: this._formBuilder.array([
        this._formBuilder.group({
          picture: [''],
          latitude: [0, Validators.required],
          longitude: [0, Validators.required]
        }),
        this._formBuilder.group({
          name: ['', Validators.required],
          email: ['', [Validators.email, Validators.required]],
          phone: ['', Validators.pattern],
          comment: ['']

        })
      ])
    })

  }

}

@Component({
  selector: 'dialog-confirme',
  template: `
    <h1 mat-dialog-title>Confirm your declaration ?</h1>
    <div mat-dialog-actions>
      <button mat-button color="primary" (click)="dialogRef.close('yes')">Yes</button>
      <button mat-button color="primary" (click)="dialogRef.close('no')">No</button>
    </div>
  `
})

export class DialogConfirme {
  constructor(public dialogRef: MatDialogRef<DialogConfirme>) {}
}