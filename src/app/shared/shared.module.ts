import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule, MatButtonModule, MatCheckboxModule,MatInputModule, 
  MatFormFieldModule, MatIconModule, MatGridListModule, MatMenuModule } from '@angular/material';

@NgModule({
  imports: [FormsModule, MatCheckboxModule, MatButtonModule, MatToolbarModule, 
    MatInputModule, MatFormFieldModule, MatIconModule, MatGridListModule, MatMenuModule],
  exports: [FormsModule, MatCheckboxModule, MatButtonModule, MatToolbarModule, 
    MatInputModule, MatFormFieldModule, MatIconModule, MatGridListModule, MatMenuModule],
})

export class SharedModule { }