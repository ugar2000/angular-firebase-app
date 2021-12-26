import {Component, OnInit} from '@angular/core';
import {NgxIndexedDBService} from "ngx-indexed-db";

@Component({
  selector: 'app-shopping-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  items: any[] = [];

  constructor(private dbService: NgxIndexedDBService) {}

  ngOnInit() {
    this.updateBasketList();
  }

  total() {
    return this.items.reduce((total, item) => total + item.price, 0);
  }

  removeItem(id: any) {
    console.log(id);
    this.dbService.delete('items', id).toPromise().then(() => {
      this.updateBasketList();
    });
  }

  updateBasketList() {
    this.dbService.getAll('items').toPromise().then(resp => {
      console.log(resp);
      this.items = resp;
    });
  }

}
