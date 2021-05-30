import {Component, OnInit, OnDestroy, Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl, FormGroup} from '@angular/forms';
import {CrudService} from '../../../service/crud.service';
import {Rate} from '../../../models/rate.model';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {interval, Subscription} from 'rxjs';
import {debounce} from 'rxjs/operators';
import {HelperService} from '../../../service/helper.service';
import {HeroInter} from '../rate-list/rate-list.component';

@Component({
  selector: 'app-create-rate',
  templateUrl: './rate-editor.component.html',
  styleUrls: ['./rate-editor.component.scss']
})
export class RateOpenButtonComponent {

  constructor(public dialog: MatDialog) {
  }

  openDialog(): void {
    this.dialog.open(RateEditCreateFormDialogComponent);
  }
}

//////////////////////////////////////////////////////////

@Component({
  selector: 'app-rate-edit-create-form-dialog',
  templateUrl: 'rate-edit-form.html',
  styleUrls: ['./rate-editor.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true}
    }
  ]
})
export class RateEditCreateFormDialogComponent implements OnInit, OnDestroy {

  rateFormGroup = new FormGroup({
    rateNameCtrl: new FormControl(),
    taglineCtrl: new FormControl(),
    priceCtrl: new FormControl(),
    detailsCtrl: new FormControl()
  });

  preparingRate: Rate = {
    rateName: '',
    rateTagline: '',
    tags: [],
    price: null,
    details: '',
    photos: []
  };
  isCreateReady = false;
  isEditable = true;
  hasErrorInImages: boolean;
  hasErrorInChips: boolean;
  hasErrorInDetails: boolean;
  selectable = true;
  removable = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  chipsCtrl = new FormControl('');
  writeSubscribe: Subscription;
  detailsSubscribe: Subscription;
  fileList: Array<File> = [];

  constructor(private crudService: CrudService, private helperService: HelperService, @Inject(MAT_DIALOG_DATA) public editingHero: any) {
  }

  ngOnInit(): void {
    this.hasErrorInChips = true;
    this.hasErrorInImages = true;
    this.hasErrorInDetails = true;

    this.writeSubscribe = this.rateFormGroup.valueChanges.pipe(debounce(() => interval(500))).subscribe(value => {
      this.preparingRate.price = value.priceCtrl;
      this.preparingRate.rateName = value.rateNameCtrl;
      this.preparingRate.rateTagline = value.taglineCtrl;
    });

    this.detailsSubscribe = this.rateFormGroup.controls.detailsCtrl.valueChanges.pipe(debounce(() => interval(500))).subscribe(text => {
      if (text.length < 20) {
        this.hasErrorInDetails = true;
      } else {
        this.hasErrorInDetails = false;
        this.preparingRate.details = text;
      }
    });

    if (this.editingHero) {
      this.prepareWindow();
    }

  }

  ngOnDestroy(): void {
    this.writeSubscribe.unsubscribe();
    this.detailsSubscribe.unsubscribe();
  }

  addToChipList(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.preparingRate.tags.push(value.trim());
      this.hasErrorInChips = !this.preparingRate.tags.length;
    }

    if (input) {
      input.value = '';
    }

  }

  removeIntoChipList(power: string): void {
    const index = this.preparingRate.tags.indexOf(power);

    if (index >= 0) {
      this.preparingRate.tags.splice(index, 1);
      this.hasErrorInChips = !this.preparingRate.tags.length;
    }

  }

  onSelectPhoto(event): void {
    event.addedFiles.forEach(image => {
      this.fileList.push(image);
      this.helperService.fileToBase64(image).then(elem => {

        this.preparingRate.photos.push({
          base64: elem,
          name: image.name
        });
        this.hasErrorInImages = !this.preparingRate.photos.length;
      });
    });
  }

  onRemovePhoto(event: File): void {
    let currentIndex = this.fileList.indexOf(event);
    this.fileList.splice(currentIndex, 1);
    currentIndex = this.preparingRate.photos.indexOf(this.helperService.filterIt(this.preparingRate.photos, event.name)[0]);
    this.preparingRate.photos.splice(currentIndex, 1);
    this.hasErrorInImages = !this.preparingRate.photos.length;
  }

  addHero(): void {
    this.crudService.createDocument(this.preparingRate, 'rates');
  }

  editHero(): void {
    this.crudService.updateDocument(this.editingHero.payload.doc.id, this.preparingRate, 'rates');
  }

  prepareWindow(): void {
    const rateData: HeroInter = this.editingHero.payload.doc.data();
    this.rateFormGroup.controls.detailsCtrl.setValue(rateData.details);
    this.rateFormGroup.controls.rateNameCtrl.setValue(rateData.rateName);
    this.rateFormGroup.controls.taglineCtrl.setValue(rateData.rateTagline);
    this.rateFormGroup.controls.priceCtrl.setValue(rateData.price);
    this.preparingRate.tags.push(...rateData.tags);
    this.hasErrorInChips = !this.preparingRate.tags.length;

    rateData.photos.forEach(photo => {
      this.preparingRate.photos.push(photo);
      this.fileList.push(this.helperService.dataURLtoFile(photo));
      this.hasErrorInImages = !this.preparingRate.photos.length;
    });
  }

}


