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
  MatProgressSpinnerModule
   } from '@angular/material';

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
    MatProgressSpinnerModule
    ],
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
    MatProgressSpinnerModule
    ]
})

export class SharedModule { }