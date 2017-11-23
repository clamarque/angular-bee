import { Component } from '@angular/core';
import { AuthService } from './shared/index';
import { Router } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  public isConnected: boolean = false;

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {
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
