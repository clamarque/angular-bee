import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';


@Injectable()
export class GoogleCloudVisionServiceService {

  constructor(public http: Http) { }

  getLabels(base64Image) {

    const body = {

      "request": [
        {
          "features": [
            {
              "type": "LABEL_DETECTION"
            }
          ],
          "images": {
            "source": {
              "imageUri": base64Image
            }
          }
        }
      ]
    }
    return this.http.post('https://vision.googleapis.com/v1/images:annotate?key=' + environment.googleCloudVisionAPIKey , body)
  }

}
