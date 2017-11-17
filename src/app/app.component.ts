import { Component } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { Router } from '@angular/router';  
import { SharedModule } from './shared/shared.module';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { SpinnerService } from './shared/spinner.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  activeSpinner: any;
  public isConnected : boolean = false;

  constructor(private authService : AuthService, 
    private router: Router, 
    private snackBar: MatSnackBar,
    private spinnerService: SpinnerService) 
    {
      this.spinnerService.spinnerActive.subscribe(active => this.toggleSpinner(active))
  }

  toggleSpinner(active) {
    console.log("inside toggle spinner")
    this.activeSpinner = active;
  }
  logout() {
    this.router.navigate(['/home']);
    this.authService.logout();
    this.snackBar.open('Already Gone ? We Hope to see you again soon', '', { duration: 5000 })
  }

  ngOnInit() {
   this.authService.isLoggin().subscribe(authStatus => {
      if (authStatus === true) {
        console.log('authStatus true', authStatus)
        this.router.navigate(['/home']);
        return this.isConnected = true;
      }
      else {
        console.log('authStatus false', authStatus)
        
        return this.isConnected = false;
      }
    });
  }
}
