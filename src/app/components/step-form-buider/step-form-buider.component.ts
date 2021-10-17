import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ChipListField, FormObj, ImagesField} from '../../interfaces/form-obj';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {MatStepper} from '@angular/material/stepper';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {MatChipInputEvent} from '@angular/material/chips';
import {HelperService} from '../../service/helper.service';

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
  @Input() editingData: object | null;
  @Output() finishEvent: EventEmitter<object> = new EventEmitter<object>();
  preparingObj: object = {};
  globalFormGroup: FormGroup = new FormGroup({});
  imagesArrays: object = {};
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private cdr: ChangeDetectorRef, private helperService: HelperService) {
  }

  ngOnInit(): void {
    console.log('start');
    this.formObject.steps.forEach(step => {
      const stepFormGroup: FormGroup = new FormGroup({});
      step.fields.forEach(field => {
        if (field.fieldType === 'images') {
          const defaultValue = this.editingData ?
            (<Array<{name: string, src: string}>> this.editingData[field.name])
              .map(item => this.helperService.dataURLtoFile(item.name, item.src)) : [];
          stepFormGroup.addControl(field.name, new FormControl(defaultValue, this.collectingValidators(field)));
        } else {
          stepFormGroup.addControl(field.name,
              new FormControl(this.editingData ? this.editingData[field.name] : null, this.collectingValidators(field)));
        }
      });
      this.globalFormGroup.addControl(step.stepName, stepFormGroup);
    });
    console.log(this.preparingObj);
    this.cdr.detectChanges();
  }

  stepBack(): void {
    this.formStepper.previous();
  }

  stepNext(): void {
    this.formStepper.next();
  }

  addToChipList(event: MatChipInputEvent, listName: string, stepName: string, sizeOptions: { min: number, max: number }): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.preparingObj[listName].push(value.trim());
      this.chipListErrorCheck(listName, stepName, sizeOptions.min, sizeOptions.max);
    }

    if (input) {
      input.value = '';
    }

  }

  removeIntoChipList(item: string, listName: string, stepName: string, sizeOptions: { min: number, max: number }): void {
    const index = this.preparingObj[listName].indexOf(item);
    if (index >= 0) {
      this.preparingObj[listName].splice(index, 1);
      this.chipListErrorCheck(listName, stepName, sizeOptions.min, sizeOptions.max);
    }
  }

  chipListErrorCheck(listName: string, stepName: string, min: number, max: number): void {
    if (this.preparingObj[listName].length > max || this.preparingObj[listName].length < min) {
      (<FormGroup> this.globalFormGroup.controls[stepName]).controls[listName].setErrors({required: true});
    } else {
      (<FormGroup> this.globalFormGroup.controls[stepName]).controls[listName].setErrors(null);
    }
  }

  pushFile(fieldName): any {
    this.preparingObj[fieldName] = [];
    this.imagesArrays[fieldName].files.forEach((elem: File) => {
      this.helperService.fileToBase64(elem).then(base64 => {
        this.preparingObj[fieldName].push({name: elem.name, src: base64});
      });
    });
  }

  finishForm(): void {
    this.finishEvent.emit(this.preparingObj);
  }

  collectingValidators(fieldObj: any): Array<ValidatorFn> {
    const valArray: Array<ValidatorFn> = [];
    fieldObj.validators.forEach(elem => {
        switch (elem) {
          case 'email':
            valArray.push(Validators.email);
            break;
          case 'required':
            valArray.push(Validators.required);
            break;
          case 'minLength':
            valArray.push(Validators.minLength(fieldObj.minSymbolsQuality));
            break;
          case 'maxLength':
            valArray.push(Validators.maxLength(fieldObj.maxSymbolsQuality));
            break;
          case 'mobile':
            valArray.push(Validators.pattern('[- +()0-9]+'));
            break;
          case 'price':
            valArray.push(Validators.pattern('\d{1,3}(?:[.,]\d{3})*(?:[.,]\d{2})'));
            break;
          case 'numeric':
            valArray.push(Validators.pattern('^[0-9]*$'));
            break;
          default:
            break;
        }
      }
    );
    return valArray;
  }

}
