import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WastetrackComponent } from './wastetrack.component';

describe('WastetrackComponent', () => {
  let component: WastetrackComponent;
  let fixture: ComponentFixture<WastetrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WastetrackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WastetrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
