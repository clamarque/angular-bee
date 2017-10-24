import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule, MatButtonModule, MatCheckboxModule,MatInputModule, 
  MatFormFieldModule, MatIconModule, MatGridListModule, MatMenuModule, 
  MatSnackBarModule, MatListModule, MatProgressBarModule, MatCardModule } from '@angular/material';

@NgModule({
  imports: [FormsModule, MatCheckboxModule, MatButtonModule, MatToolbarModule, 
    MatInputModule, MatFormFieldModule, MatIconModule, MatGridListModule, MatMenuModule, 
    MatSnackBarModule, MatListModule, MatProgressBarModule, MatCardModule],
  exports: [FormsModule, MatCheckboxModule, MatButtonModule, MatToolbarModule, 
    MatInputModule, MatFormFieldModule, MatIconModule, MatGridListModule, MatMenuModule, 
    MatSnackBarModule, MatListModule, MatProgressBarModule, MatCardModule]
})

export class SharedModule { }