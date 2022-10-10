import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HTMLtoExcelComponent } from './htmlto-excel.component';

describe('HTMLtoExcelComponent', () => {
  let component: HTMLtoExcelComponent;
  let fixture: ComponentFixture<HTMLtoExcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HTMLtoExcelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HTMLtoExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
