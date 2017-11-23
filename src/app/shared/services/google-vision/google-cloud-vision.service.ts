import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../../../environments/environment';


@Injectable()
export class GoogleCloudVisionService {

  constructor(public http: Http) { }

  getLabels(base64Image) {

    const body = {
      "requests": [
        {
          "image": {
            "content": base64Image
          },
          "features": [
            {
              "type": "WEB_DETECTION"
            }
          ],
          /*"image": {
            "source": {
              "content": base64Image
            }
          } */
        }
      ]
    }
    return this.http.post('https://vision.googleapis.com/v1/images:annotate?key=' + environment.googleCloudVisionAPIKey , body)
  }

}
