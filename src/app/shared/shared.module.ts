import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule, MatButtonModule, MatCheckboxModule,MatInputModule, MatFormFieldModule, MatIconModule } from '@angular/material';

@NgModule({
  imports: [FormsModule, MatCheckboxModule, MatButtonModule, MatToolbarModule, MatInputModule, MatFormFieldModule, MatIconModule],
  exports: [FormsModule, MatCheckboxModule, MatButtonModule, MatToolbarModule, MatInputModule, MatFormFieldModule, MatIconModule],
})

export class SharedModule { }