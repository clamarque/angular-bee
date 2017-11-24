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
  isConnected: boolean = false;
  isBeginning: boolean = false;
  isSetLocation: boolean = true;
  isStart: boolean = true;
  pictures = [];
  formGroup: FormGroup;

  constructor(private authService: AuthService, private dialog: MatDialog, private vision: GoogleCloudVisionService, private _formBuilder: FormBuilder, private uploadService: UploadService) { }

  get formArray(): AbstractControl | null { return this.formGroup.get('formArray') };

  confirmDialog() {
    let dialogRef = this.dialog.open(DialogConfirme);

    dialogRef.afterClosed().subscribe(result => {
      console.log('result', result)
      if (result == 'yes') {
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

      }
    }
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
  constructor(public dialogRef: MatDialogRef<DialogConfirme>) { }
}