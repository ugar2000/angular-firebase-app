import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormObj} from '../../interfaces/form-obj';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {MatStepper} from '@angular/material/stepper';
import {FormBuilder, FormControl} from '@angular/forms';

@Component({
  selector: 'app-step-form-buider',
  templateUrl: './step-form-buider.component.html',
  styleUrls: ['./step-form-buider.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true}
    }
  ]
})
export class StepFormBuiderComponent implements OnInit {

  @ViewChild('stepper') private formStepper: MatStepper;
  @Input() formObject: FormObj;
  preparingObj: object = {};

  constructor() {
    const formOnj = {};
    this.formObject.steps.forEach(step => {
      step.fields.forEach(field => {
        this.preparingObj[field.name] = field.preparingValue;
      });
    });
  }

  ngOnInit(): void {
  }

  stepBack(): void {
    this.formStepper.previous();
  }

  stepNext(): void {
    this.formStepper.next();
  }
}
