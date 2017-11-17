import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleVisionComponent } from './google-vision.component';

describe('GoogleVisionComponent', () => {
  let component: GoogleVisionComponent;
  let fixture: ComponentFixture<GoogleVisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleVisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleVisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
