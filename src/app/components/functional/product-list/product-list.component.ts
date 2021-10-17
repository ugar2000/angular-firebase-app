import {Component, OnInit} from '@angular/core';
import {CrudProductService} from '../../../service/crud-product.service';
import {HelperService} from '../../../service/helper.service';
import {SwiperOptions} from 'swiper';
import {ProductEditCreateFormDialogComponent} from '../product-editor/product-editor.component';
import {MatDialog} from '@angular/material/dialog';
import {Product} from '../../../models/product.model';


@Component({
  selector: 'app-hero-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  productList: Array<Product> = [];

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

  constructor(public crudService: CrudProductService, public helperService: HelperService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.crudService.getDocuments()
      .subscribe(res => {
        this.productList = res;
      });
  }

  photoReader(photoElem: { name: string, base64: string }): string {
    return photoElem.base64;
  }

  openEditDialog(product): void {
    this.dialog.open(ProductEditCreateFormDialogComponent, {
      data: product
    });
  }

  deleteCurrent(rate): void {
    this.crudService.deleteDocument(rate).toPromise().then((resp) => {
      console.log(resp);
    }).catch(error => {console.error(error); });
  }

}
