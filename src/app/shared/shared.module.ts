import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule, MatCheckboxModule} from '@angular/material';

@NgModule({
  imports: [FormsModule, MatCheckboxModule, MatToolbarModule],
  exports: [FormsModule, MatCheckboxModule, MatToolbarModule],
})
export class SharedModule { }