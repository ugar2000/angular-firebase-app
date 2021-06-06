import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepFormBuiderComponent } from './step-form-buider.component';

describe('StepFormBuiderComponent', () => {
  let component: StepFormBuiderComponent;
  let fixture: ComponentFixture<StepFormBuiderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepFormBuiderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepFormBuiderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
