import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { 
  MatToolbarModule, 
  MatButtonModule, 
  MatCheckboxModule,
  MatInputModule, 
  MatFormFieldModule,
  MatIconModule, 
  MatGridListModule, 
  MatMenuModule, 
  MatSnackBarModule, 
  MatListModule, 
  MatProgressBarModule, 
  MatCardModule,
  MatStepperModule,
  MatGridListModule } from '@angular/material';

@NgModule({
  imports: [
    FormsModule, 
    MatCheckboxModule, 
    MatButtonModule, 
    MatToolbarModule, 
    MatInputModule, 
    MatFormFieldModule, 
    MatIconModule, 
    MatGridListModule, 
    MatMenuModule, 
    MatSnackBarModule, 
    MatListModule, 
    MatProgressBarModule, 
    MatCardModule,
    MatStepperModule,
    MatGridListModule],
  exports: [
    FormsModule, 
    MatCheckboxModule, 
    MatButtonModule, 
    MatToolbarModule, 
    MatInputModule, 
    MatFormFieldModule, 
    MatIconModule, 
    MatGridListModule, 
    MatMenuModule, 
    MatSnackBarModule, 
    MatListModule, 
    MatProgressBarModule, 
    MatCardModule,
    MatStepperModule,
    MatGridListModule]
})

export class SharedModule { }