import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-google-vision',
  templateUrl: './google-vision.component.html',
  styleUrls: ['./google-vision.component.scss']
})
export class GoogleVisionComponent implements OnInit {
  @Output() fileSelected = new EventEmitter();

  constructor() { }

  handleFileSelected(files) {
    console.log(files)
    this.fileSelected.emit(files)
  }

  ngOnInit() {
  }

}
