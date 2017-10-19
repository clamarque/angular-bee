import { Component } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { Router } from '@angular/router';  

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  public isConnected : boolean = false;

  constructor(private authService : AuthService, private router: Router) {

  }

  logout() {
    this.authService.logout();
  }

  ngOnInit() {
   this.authService.isLoggin().subscribe(authStatus => {
      if (authStatus == true) {
        this.router.navigate(['/home']);
        return this.isConnected = true;
      }
      else {
        return this.isConnected = false;
      }
    });
  }
}
