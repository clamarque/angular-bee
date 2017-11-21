import { Directive, HostListener, HostBinding, EventEmitter, Output, Input } from '@angular/core';
//import {forEach} from "@angular/router/src/utils/collection";

@Directive({
  selector: '[appFileSelector]'
})
export class FileSelectorDirective {
  @Input() private allowed_extensions : Array<string> = [];
  @Output() private filesChangeEmiter : EventEmitter<File[]> = new EventEmitter();
  @Output() private filesInvalidEmiter : EventEmitter<File[]> = new EventEmitter();
  @HostBinding('style.background') private background = '#FFF';

  constructor() { }

  @HostListener('dragover', ['$event']) public onDragOver(evt){
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#FFA000';
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(evt){
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#FFF';
  }

  @HostListener('drop', ['$event']) public onDrop(evt){
    //console.log('evt drop', evt)
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#FFA000';
    let files = evt.dataTransfer.files;
    let valid_files : Array<File> = [];
    let invalid_files : Array<File> = [];
    if(files.length > 0){
      for(let file of files) {
        // get ext from file
        let ext = file.name.split('.')[file.name.split('.').length - 1];
        if(this.allowed_extensions.lastIndexOf(ext) != -1){
          valid_files.push(file);
        }else{
          invalid_files.push(file);
        }

      }
      this.filesChangeEmiter.emit(valid_files);
      this.filesInvalidEmiter.emit(invalid_files);
    }
  }

  @HostListener('change', ['$event']) public onChange(evt){
    //console.log('evt change', evt)
    let files = evt.target.files;
    let valid_files : Array<File> = [];
    let invalid_files : Array<File> = [];
    //console.log(files)
    if(files.length > 0) {
      for(let file of files) {
         // get ext from file
         let ext = file.name.split('.')[file.name.split('.').length - 1];
         if(this.allowed_extensions.lastIndexOf(ext) != -1){
           valid_files.push(file);
         }else{
           invalid_files.push(file);
         }
      }
      this.filesChangeEmiter.emit(valid_files);
      this.filesInvalidEmiter.emit(invalid_files);
    }
  }

}
