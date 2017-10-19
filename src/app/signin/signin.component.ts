import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { SharedModule } from '../shared/shared.module';
import { Router } from '@angular/router';  

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.sass']
})
export class SignInComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) {

   }

  submit(formData) {
    console.log(formData);
    this.auth.connectToDb(formData.email, formData.password, (error)=> {
      if (error) {
        console.log(error);
      }
      else {
        console.log("ok");
      }
    });
  }

  createAccount() {
    this.router.navigate(['/signup']);
  }

  ngOnInit() {
  }
}
