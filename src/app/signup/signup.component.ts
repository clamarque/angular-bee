import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/index';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignUpComponent implements OnInit {

  constructor(private auth: AuthService) { }

  submit(formData) {
    this.auth.createAccount(formData.email, formData.password, (error)=> {
      if (error) {
        console.log(error);
      }
      else {
        console.log("ok creation");
      }
    });
  }


  ngOnInit() {
  }

}
