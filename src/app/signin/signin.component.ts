import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { SharedModule } from '../shared/shared.module';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.sass']
})
export class SignInComponent implements OnInit {
  hide = true;

  constructor(private auth: AuthService, private router: Router, private snackBar: MatSnackBar) {

  }

  submit(formData) {
    this.auth.connectToDb(formData.email, formData.password, (error) => {
      if (error) {
        this.snackBar.open(error, 'hide', { duration: 5000 })
      }
      else {
        this.snackBar.open('Welcome', '', { duration: 5000 })
      }
    });
  }

  createAccount() {
    this.router.navigate(['/signup']);
  }

  ngOnInit() {
  }
}
