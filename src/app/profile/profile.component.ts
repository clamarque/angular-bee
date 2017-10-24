import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { SharedModule } from '../shared/shared.module';
import { Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  public email;
  public isConnected;

  constructor(private authService: AuthService, private router: Router) { }

  submit(formData) {
    console.log(formData);
    this.authService.changePassword(formData.password, (error)=> {
      if (error) {
        console.log(error);
      }
      else {
        console.log("ok");
      }
    });
  }


  
  ngOnInit() {
    let user = this.authService.getCurrentEmail();
    console.log(user)

    if (user != null)
      this.email = user.email;

    // REGARDER AVEC https://angular.io/guide/router POUR REDIRIGER AUTOMATIQUEMENT LE USER SI IL NA PAS LES DROITS 

  }

}
