import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandPhotoSignComponent } from './cand-photo-sign.component';

describe('CandPhotoSignComponent', () => {
  let component: CandPhotoSignComponent;
  let fixture: ComponentFixture<CandPhotoSignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandPhotoSignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandPhotoSignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
