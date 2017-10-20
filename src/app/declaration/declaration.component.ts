import { Component, OnInit } from '@angular/core';
import { GoogleCloudVisionServiceService } from '../shared/google-cloud-vision-service.service';
import { AuthService } from '../shared/index';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-declaration',
  templateUrl: './declaration.component.html',
  styleUrls: ['./declaration.component.sass']
})
export class DeclarationComponent implements OnInit {
  items: Observable<any[]>;

  constructor(private authService: AuthService, private vision: GoogleCloudVisionServiceService) { }

 

  selectFile(event) {

    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      console.log('file:', file)
      reader.readAsDataURL(file);
      reader.onload = () => {
 
        this.vision.getLabels(reader.result.split(',')[1]).subscribe(response => {
          console.log(response.json().responses);
          this.authService.saveResult(reader.result.split(',')[1], response.json().responses);
        })
      }; 
    }
    
    /*this.vision.getLabels(file.name).subscribe(result => {
      console.log(result);
    })
    */
  }



  ngOnInit() {
    console.log('init')
    this.items = this.authService.getResult().valueChanges();

    console.log('items', this.items)
   
  }

}
