import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-google-vision',
  templateUrl: './google-vision.component.html',
  styleUrls: ['./google-vision.component.scss']
})


export class GoogleVisionComponent implements OnInit {
  private fileList: any = [];
  private invalidFiles: any = [];
  @Output() fileChange = new EventEmitter();

  constructor() { }

  onFilesChange(fileList: FileList){
    this.fileList = fileList;
    console.log('onfileschange filelist', this.fileList);
    let reader = new FileReader();
    for(let file of this.fileList) {
      reader.readAsDataURL(file);
      reader.onload = () => {
      }

    }
    this.fileChange.emit(this.fileList);
  }

  onFileInvalids(fileList : Array<File>){
    //console.log('onfileinvalid filelist', fileList);
    this.invalidFiles = fileList;
  }

  ngOnInit() {
  }

}
