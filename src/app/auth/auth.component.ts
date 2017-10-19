import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass']
})
export class AuthComponent implements OnInit {

  constructor(private auth: AuthService) {

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

  ngOnInit() {
    console.log('hello signin')
  }
}
