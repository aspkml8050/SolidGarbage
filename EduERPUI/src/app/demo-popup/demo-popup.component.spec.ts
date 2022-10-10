import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoPopupComponent } from './demo-popup.component';

describe('DemoPopupComponent', () => {
  let component: DemoPopupComponent;
  let fixture: ComponentFixture<DemoPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemoPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
