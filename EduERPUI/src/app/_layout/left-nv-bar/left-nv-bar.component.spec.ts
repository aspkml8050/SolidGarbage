import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftNvBarComponent } from './left-nv-bar.component';

describe('LeftNvBarComponent', () => {
  let component: LeftNvBarComponent;
  let fixture: ComponentFixture<LeftNvBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeftNvBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftNvBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
