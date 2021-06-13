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
