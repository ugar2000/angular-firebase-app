import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-basket-item',
  templateUrl: './basket-item.component.html',
  styleUrls: ['./basket-item.component.scss']
})
export class BasketItemComponent {
  @Input() item: any;
  @Output() onRemove = new EventEmitter<number>();

  remove(id) {
    this.onRemove.emit(id);
  }
}
