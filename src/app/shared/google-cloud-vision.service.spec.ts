import { TestBed, inject } from '@angular/core/testing';

import { GoogleCloudVisionService } from './google-cloud-vision.service';

describe('GoogleCloudVisionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoogleCloudVisionService]
    });
  });

  it('should ...', inject([GoogleCloudVisionService], (service: GoogleCloudVisionService) => {
    expect(service).toBeTruthy();
  }));
});
