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
  isStart: boolean = true;
  formGroup: FormGroup;


  constructor(private authService: AuthService, private _formBuilder: FormBuilder) { }

  get formArray(): AbstractControl | null { return this.formGroup.get('formArray') };

  step1() {
    this.isBeginning = true;
    this.isStart = false;
  }
  handleFileSelected(files) {
    console.log(files)
  }

  submit() {
    console.log(this.formGroup.value)
  }

  ngOnInit() {
    this.authService.isLoggin().subscribe(authStatus => { return authStatus === true ? this.isConnected = true : this.isConnected = false; })
      
    this.formGroup = this._formBuilder.group({
      formArray: this._formBuilder.array([
        this._formBuilder.group({

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
