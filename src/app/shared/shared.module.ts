import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule, MatButtonModule, MatCheckboxModule,MatInputModule, 
  MatFormFieldModule, MatIconModule, MatGridListModule, MatMenuModule, MatSnackBarModule } from '@angular/material';

@NgModule({
  imports: [FormsModule, MatCheckboxModule, MatButtonModule, MatToolbarModule, 
    MatInputModule, MatFormFieldModule, MatIconModule, MatGridListModule, MatMenuModule, MatSnackBarModule],
  exports: [FormsModule, MatCheckboxModule, MatButtonModule, MatToolbarModule, 
    MatInputModule, MatFormFieldModule, MatIconModule, MatGridListModule, MatMenuModule, MatSnackBarModule]
})

export class SharedModule { }