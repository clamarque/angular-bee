import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService, GoogleCloudVisionService, UploadService } from '../shared/index';
import { Upload } from '../shared/services/upload/upload';

@Component({
  selector: 'app-google-vision',
  templateUrl: './google-vision.component.html',
  styleUrls: ['./google-vision.component.scss']
})


export class GoogleVisionComponent implements OnInit {
  currentId: string = '';
  private fileList: any = [];
  private invalidFiles: any = [];
  @Output() fileChange = new EventEmitter();
  currentFileUpload: Upload;
  fileAnalyzedpercent: number;
  items: any[];
  onAnalyzed: boolean = false;
  fileChosen: string = "";
  isAnalyzed: boolean = false;
  isUpload: boolean = false;
  progress: { percentage: number } = { percentage: 0 };

  constructor(private authService: AuthService, private vision: GoogleCloudVisionService) { }

  onFilesChange(fileList: FileList) {
    this.fileList = fileList;
    this.onAnalyzed = true;
    this.isUpload = true;
    console.log('onfileschange filelist', this.fileList);
    let reader = new FileReader();
    this.currentFileUpload = new Upload(this.fileList);

    for (let file of this.fileList) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.vision.getLabels(reader.result.split(',')[1]).subscribe(response => {
          this.isAnalyzed = true;
          this.onAnalyzed = false;
          this.fileAnalyzedpercent = this.analyzePicture(response.json().responses);
          
          let res = response.json().responses
          console.log('result vision', response.json().responses)
          
          for (let r of res[0].webDetection.webEntities) {
            if (r.description != null) {
              console.log('asian race:', r.description)

              if (r.description.indexOf("Asian predatory wasp:") != -1 || r.description.indexOf("Asian giant hornet") != -1) {
                console.log('asian detected');
                //push picture in firebase
                //this.uploadService.pushFileToStorage(this.currentFileUpload, this.progress, this.currentId, response.json().responses, this.fileAnalyzedpercent);          
              }
            }
          }
        })
      }
    }

    this.fileChange.emit(this.fileList);
  }

  analyzePicture(results) {
    let maxScore = 0;
    this.items = [];
    if (results[0].webDetection && results[0].webDetection.webEntities) {
      for (let detection of results[0].webDetection.webEntities) {
        if (detection.score && detection.description) {
          this.items.push(detection);
          if (detection.description.indexOf("Asian predatory wasp") >= 0
            || detection.description.indexOf("Asian giant hornet") >= 0) {
            if (detection.score >= maxScore) { // A CREUSER
              maxScore = detection.score
            }
          }
        }
      }
    }
    return maxScore;
  }

  getIcon() {
    if (this.fileAnalyzedpercent >= 0.75)
      return "check";
    else
      return "clear";
  }

  getColor() {
    if (this.fileAnalyzedpercent >= 1)
      return "#4CAF50";
    else if (this.fileAnalyzedpercent >= 0.75)
      return "#FF9800";
    else
      return "#FF5722";
  }

  convertScore(score: number) {
    if (score >= 1)
      return 100
    else
      return Math.round(score * 100)
  }

  onFileInvalids(fileList: Array<File>) {
    //console.log('onfileinvalid filelist', fileList);
    this.invalidFiles = fileList;
  }

  ngOnInit() {
    this.currentId = this.authService.getCurrentUid();
    console.log('currentId', this.currentId);
  }

}
