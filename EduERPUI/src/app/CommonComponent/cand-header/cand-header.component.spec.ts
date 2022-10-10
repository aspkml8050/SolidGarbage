import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandHeaderComponent } from './cand-header.component';

describe('CandHeaderComponent', () => {
  let component: CandHeaderComponent;
  let fixture: ComponentFixture<CandHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
