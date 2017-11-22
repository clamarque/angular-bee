import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
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
  pictures = []
  formGroup: FormGroup;

  constructor(private authService: AuthService, private _formBuilder: FormBuilder) { }

  get formArray(): AbstractControl | null { return this.formGroup.get('formArray') };

  step1() {
    this.isBeginning = true;
    this.isStart = false;
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

  setLocation() {
    this.isSetLocation = false;
  }


  onSubmit() {
    if (this.formGroup.status != 'VALID') console.log('form is not valid')
    else {
      console.log('data: ', this.formGroup.value, 'pictures:', this.pictures)
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