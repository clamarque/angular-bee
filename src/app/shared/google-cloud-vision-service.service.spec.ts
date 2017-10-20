import { TestBed, inject } from '@angular/core/testing';

import { GoogleCloudVisionServiceService } from './google-cloud-vision-service.service';

describe('GoogleCloudVisionServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoogleCloudVisionServiceService]
    });
  });

  it('should ...', inject([GoogleCloudVisionServiceService], (service: GoogleCloudVisionServiceService) => {
    expect(service).toBeTruthy();
  }));
});
