import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {  
  MatButtonModule, 
  MatCheckboxModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,  
  MatInputModule,
  MatListModule,
  MatMenuModule, 
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatStepperModule,
  MatToolbarModule
   } from '@angular/material';

@NgModule({
  imports: [
    FormsModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,  
    MatInputModule,
    MatListModule,
    MatMenuModule, 
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatStepperModule,
    MatToolbarModule
    ],
  exports: [
    FormsModule, 
    MatButtonModule, 
    MatCheckboxModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,  
    MatInputModule,
    MatListModule,
    MatMenuModule, 
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatStepperModule,
    MatToolbarModule
    ]
})

export class SharedModule { }