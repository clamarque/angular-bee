import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass']
})
export class AuthComponent implements OnInit {

  constructor() { }

  signIn() {
    console.log("SignIn");
  }

  ngOnInit() {
    console.log('hello signin')
  }
}
