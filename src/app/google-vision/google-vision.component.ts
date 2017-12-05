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
  currentId: string = '';
  private fileList: any = [];
  private invalidFiles: any = [];
  @Output() fileChange = new EventEmitter();
  @Output() dataVision = new EventEmitter();
  currentFileUpload: Upload;
  fileAnalyzedpercent: number;
  items: any[];
  image_preview;
  image_name;
  image_date;
  onAnalyzed: boolean = false;
  isAnalyzed: boolean = false;
  public progress: { percentage: number } = { percentage: 0 };

  constructor(private authService: AuthService, private vision: GoogleCloudVisionService, private uploadService: UploadService) { }

  onFilesChange(fileList) {

    this.fileList = {
      lastModified: '',
      lastModifiedDate: '',
      name: '',
      size: 0,
      type: '',
      webkitRelativePath: ''
    }
    this.fileList = fileList;
    

    console.log('fileList:', this.fileList);
    this.onAnalyzed = true;
    this.isAnalyzed = false;
    let reader = new FileReader();

    for (let file of this.fileList) {

      console.log(file)
     

      //this.currentFileUpload = new Upload(file)
      this.currentFileUpload = {
        $key: '',
        file: file,
        name: '',
        url: '',
        progress: 0,
        createdAt: new Date()
      }

      console.log('currentfileupload', this.currentFileUpload)
      let newFile = this.currentFileUpload
      reader.readAsDataURL(file);
      this.image_name = file.name;
      this.image_date = file.lastModifiedDate;
      reader.onload = (e: any) => {
        this.image_preview = e.target.result;
        this.vision.getLabels(e.target.result.split(',')[1]).subscribe(response => {

          this.fileAnalyzedpercent = this.analyzePicture(response.json().responses);

          this.onAnalyzed = false;
          this.isAnalyzed = true;

          let res = response.json().responses;
          this.array_vision = [];
       
          this.array_vision.push({
            image: this.currentFileUpload,
            percent: this.fileAnalyzedpercent,
            results: res
          })

          this.dataVision.emit(this.array_vision)

          for (let r of res[0].webDetection.webEntities) {
            if (r.description != null) {

              if (r.description.indexOf("Asian predatory wasp") != -1 || r.description.indexOf("Asian giant hornet") != -1) {
                //push picture in firebase

                this.uploadService.pushFileToStorage(this.currentFileUpload, this.progress, this.currentId, response.json().responses, this.fileAnalyzedpercent);

              

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