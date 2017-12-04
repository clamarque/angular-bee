import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatDialog, MatDialogRef, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { Router } from '@angular/router';

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
  isEnableLocation: boolean = true;
  isStart: boolean = true;
  formGroup: FormGroup;

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private vision: GoogleCloudVisionService,
    private _formBuilder: FormBuilder,
    private uploadService: UploadService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  get formArray(): AbstractControl | null { return this.formGroup.get('formArray') };

  confirmDialog() {
    let dialogRef = this.dialog.open(DialogConfirme);

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'yes') {
        if(this.isConnected == true) {


        }
        else {
        
        }
        this.authService.createDeclaration(this.formGroup.value, (error) => {
          if (!error) {
            this.formGroup.reset();
            this.snackBar.open('Thank you ! your statement has been sent correctly', '', { duration: 5000 });
            this.router.navigate(['/home']);
          }
        });
      }
      else console.log('no push data')
    })
  }

  step1() {
    this.isBeginning = true;
    this.isStart = false;
  }

  enableLocation() {
    this.isEnableLocation = false;
  }

  handleFileSelected(files) {
    if (files.length > 0) {
      for (let file of files) {
        // https://stackoverflow.com/questions/39229398/how-to-update-controls-of-formarray
        // set value picture        
        (<FormArray>this.formGroup.controls['formArray']).at(0).patchValue({
          picture: file.name
        });
      }
    }
  }

  handleLocation(location) {
    if (location.length > 0) {
      for (let locate of location) {
        (<FormArray>this.formGroup.controls['formArray']).at(0).patchValue({
          latitude: locate.latitude,
          longitude: locate.longitude
        })
      }
    }
  }

  onSubmit() {
    if (this.formGroup.status != 'VALID') this.snackBar.open('The form is not valid', 'hide', { duration: 5000 })
    else this.confirmDialog();
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
          comment: [''],
          date: Date()
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