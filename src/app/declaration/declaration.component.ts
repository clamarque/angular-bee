import { Component, OnInit } from '@angular/core';
import { GoogleCloudVisionServiceService } from '../shared/google-cloud-vision-service.service';
@Component({
  selector: 'app-declaration',
  templateUrl: './declaration.component.html',
  styleUrls: ['./declaration.component.sass']
})
export class DeclarationComponent implements OnInit {

  constructor(private vision: GoogleCloudVisionServiceService) { }

  ngOnInit() {
  }

  selectFile(event) {
    const file = event.target.files.item(0)
    console.log(file)
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      console.log('file:', file)
      reader.readAsDataURL(file);
      reader.onload = () => {
        //console.log('file?:' , file.type, reader.result.split(',')[1])
       /* this.form.get('avatar').setValue({
          filename: file.name,
          filetype: file.type,
          value: reader.result.split(',')[1]
        }) */
        this.vision.getLabels(reader.result.split(',')[1]).subscribe(response => {
          console.log(response);
        })
      }; 
    }
    
    /*this.vision.getLabels(file.name).subscribe(result => {
      console.log(result);
    })
    */
  }

}
