import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService, GoogleCloudVisionService, UploadService } from '../shared/index';
import { Upload } from '../shared/services/upload/upload';

@Component({
  selector: 'app-google-vision',
  templateUrl: './google-vision.component.html',
  styleUrls: ['./google-vision.component.scss']
})

export class GoogleVisionComponent implements OnInit {
  array_vision = [];
  array_file = [];
  currentId: string = '';
  private fileList: any = [];
  private invalidFiles: any = [];
  @Output() fileChange = new EventEmitter();
  @Output() dataVision = new EventEmitter();
  currentFileUpload: Upload;
  fileAnalyzedpercent: number;
  items: any[];
  image_date;
  image_name;  
  image_preview;
  img_result: any;
  img_upload: any;
  onAnalyzed: boolean = false;
  isAnalyzed: boolean = false;
  public progress: { percentage: number } = { percentage: 0 };

  constructor(private authService: AuthService, private vision: GoogleCloudVisionService, private uploadService: UploadService) { }

  onFilesChange(fileList) {
    console.log('filelist:', fileList)

    this.fileList = fileList;
    console.log('fileList:', this.fileList);
    this.onAnalyzed = true;
    this.isAnalyzed = false;
    let reader = new FileReader();

    for (let file of this.fileList) {
      console.log('file:', file);
      this.array_file.push({
        name: file.name,
        lastModifiedDate: file.lastModifiedDate,
        size: file.size,
        type: file.type
      })

      console.log('array file:', this.array_file)
       
      this.currentFileUpload = new Upload(file)
      
      let img_notUpload = Object.assign({}, this.currentFileUpload);

      reader.readAsDataURL(file);
      this.image_name = file.name;
      this.image_date = file.lastModifiedDate;
      reader.onload = (e: any) => {
        this.image_preview = e.target.result;
        this.vision.getLabels(e.target.result.split(',')[1]).subscribe(responses => {

          this.fileAnalyzedpercent = this.analyzePicture(responses.json().responses);
          this.onAnalyzed = false;
          this.isAnalyzed = true;
          this.array_vision = [];
          
          let response = responses.json().responses;
       
          for (let r of response[0].webDetection.webEntities) {
            if (r.description != null) {
              if (r.description.indexOf("Asian predatory wasp") != -1 || r.description.indexOf("Asian giant hornet") != -1) {
                //push picture in firebase
                this.img_upload = this.uploadService.pushFileToStorage(this.currentFileUpload, this.progress, this.currentId, response, this.fileAnalyzedpercent)
                console.log('img_upload:', this.img_upload)
              }
            }
          }

          if (!this.img_upload) this.img_result = this.array_file
          else this.img_result = this.img_upload 
          
          this.array_vision.push({
            image: this.img_result,
            percent: this.fileAnalyzedpercent,
            results: response
          })

          this.dataVision.emit(this.array_vision)
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

  convertScore(score: number) {
    if (score >= 1) return 100
    else return Math.round(score * 100)
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