import {Component, OnInit} from '@angular/core';
import {CrudService} from '../../../service/crud.service';
import {HelperService} from '../../../service/helper.service';
import {SwiperOptions} from 'swiper';
import {RateEditCreateFormDialogComponent} from '../rate-editor/rate-editor.component';
import {MatDialog} from '@angular/material/dialog';
import {Rate} from '../../../models/rate.model';
import {FormObj} from '../../../interfaces/form-obj';

export interface HeroInter extends Rate {
  id: string;
}

@Component({
  selector: 'app-hero-list',
  templateUrl: './rate-list.component.html',
  styleUrls: ['./rate-list.component.scss']
})
export class RateListComponent implements OnInit {

  testFormObj: FormObj = {
    name: 'test', steps: [{
      stepName: 'testStep', fields: [{
        name: 'testF',
        label: 'testF',
        type: 'text',
        fieldType: 'text-input',
        placeholder: 'test',
        validators: ['required']
      },
        {
          name: 'testChip',
          label: 'testChip',
          placeholder: 'testChip',
          fieldType: 'chip-list',
          preparingValue: [],
          minTagsQuantity: 4,
          maxTagsQuantity: 10,
          validators: ['required']
        },
        {
          name: 'testArea',
          label: 'testArea',
          placeholder: 'gergerfdsvreg',
          fieldType: 'textarea',
          minSymbolsQuality: 30,
          maxSymbolsQuality: 3000,
          minRowsQuality: 1,
          maxRowsQuality: 100,
          validators: ['required', 'minLength', 'maxLength']
        },
        {
          name: 'testPhoto',
          label: 'testPhoto',
          placeholder: 'testPhoto',
          fieldType: 'images',
          validators: ['required'],
          minImagesQuality: 1,
          maxImagesQuality: 5
        }
        ]
    },
      {
        stepName: 'testStep2', fields: [{
          name: 'testF2',
          label: 'testF2',
          type: 'text',
          fieldType: 'text-input',
          placeholder: 'test2',
          validators: ['required']
        }]
      }]
  };

  ratesList: Array<any> = [];

  public config: SwiperOptions = {
    a11y: {enabled: true},
    direction: 'horizontal',
    slidesPerView: 1,
    keyboard: true,
    mousewheel: true,
    scrollbar: false,
    navigation: true,
    pagination: false
  };

  constructor(public crudService: CrudService, public helperService: HelperService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getAllRates();
  }

  getAllRates(): void {
    this.crudService.getDocuments('menu')
      .subscribe(res => {
        this.ratesList = res;
      });
  }

  photoReader(photoElem: { name: string, base64: string }): string {
    return photoElem.base64;
  }

  openEditDialog(rate): void {
    this.dialog.open(RateEditCreateFormDialogComponent, {
      data: rate
    });
  }

  deleteCurrentRate(rate): void {
    this.crudService.deleteDocument(rate, 'menu');
  }

}
