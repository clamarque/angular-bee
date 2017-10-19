import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule, MatButtonModule, MatCheckboxModule,MatInputModule, MatFormFieldModule} from '@angular/material';

@NgModule({
  imports: [FormsModule, MatCheckboxModule, MatButtonModule, MatToolbarModule, MatInputModule, MatFormFieldModule],
  exports: [FormsModule, MatCheckboxModule, MatButtonModule, MatToolbarModule, MatInputModule, MatFormFieldModule],
})

export class SharedModule { }