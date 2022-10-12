import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdscrapcorrectionComponent } from './updscrapcorrection.component';

describe('UpdscrapcorrectionComponent', () => {
  let component: UpdscrapcorrectionComponent;
  let fixture: ComponentFixture<UpdscrapcorrectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdscrapcorrectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdscrapcorrectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
