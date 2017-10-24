import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule, MatButtonModule, MatCheckboxModule,MatInputModule, 
  MatFormFieldModule, MatIconModule, MatGridListModule, MatMenuModule, 
  MatSnackBarModule, MatListModule, MatProgressBarModule } from '@angular/material';

@NgModule({
  imports: [FormsModule, MatCheckboxModule, MatButtonModule, MatToolbarModule, 
    MatInputModule, MatFormFieldModule, MatIconModule, MatGridListModule, MatMenuModule, 
    MatSnackBarModule, MatListModule, MatProgressBarModule],
  exports: [FormsModule, MatCheckboxModule, MatButtonModule, MatToolbarModule, 
    MatInputModule, MatFormFieldModule, MatIconModule, MatGridListModule, MatMenuModule, 
    MatSnackBarModule, MatListModule, MatProgressBarModule]
})

export class SharedModule { }