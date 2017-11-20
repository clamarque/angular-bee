import { Directive, HostListener, HostBinding, EventEmitter, Output, Input } from '@angular/core';
//import {forEach} from "@angular/router/src/utils/collection";

@Directive({
  selector: '[appFileSelector]'
})
export class FileSelectorDirective {
  @Input() private allowed_extensions : Array<string> = [];
  @Output() private filesChangeEmiter : EventEmitter<File[]> = new EventEmitter();
  @Output() private filesInvalidEmiter : EventEmitter<File[]> = new EventEmitter();
  @HostBinding('style.background') private background = '#eee';

  constructor() { }

  @HostListener('dragover', ['$event']) public onDragOver(evt){
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#999';
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(evt){
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#eee'
  }

  @HostListener('drop', ['$event']) public onDrop(evt){
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#eee';
    let files = evt.dataTransfer.files;
    console.log('files host', files)
    let valid_files : Array<File> = [];
    let invalid_files : Array<File> = [];
    if(files.length > 0){
      for(let file of files) {
        console.log('files names from D', file.name.toLowerCase());
        let ext = file.name.split('.')[file.name.split('.').length - 1];
        console.log('ext from D', ext);
        if(this.allowed_extensions.lastIndexOf(ext) != -1){
          valid_files.push(file);
        }else{
          invalid_files.push(file);
        }

      }
      //this.filesChangeEmiter.emit(files);
      
      //forEach(files, files)
    

      /*forEach(files, (file: File) =>{
       
      }); */
      this.filesChangeEmiter.emit(valid_files);
      this.filesInvalidEmiter.emit(invalid_files);
    }
  }

}
