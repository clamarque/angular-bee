import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-google-vision',
  templateUrl: './google-vision.component.html',
  styleUrls: ['./google-vision.component.scss']
})
export class GoogleVisionComponent implements OnInit {
  @Output() fileSelected = new EventEmitter();
  private fileList: any = [];
  private invalidFiles: any = [];

  constructor() { }

  onFilesChange(fileList: FileList){
    console.log('filelist', fileList);
    this.fileList = fileList;
  }

  onFileInvalids(fileList : Array<File>){
    console.log('filelist invalid', fileList);
    this.invalidFiles = fileList;
  }

  handleFileSelected(files) {
    console.log(files)
    this.fileSelected.emit(files)
  }

  ngOnInit() {
  }

}
