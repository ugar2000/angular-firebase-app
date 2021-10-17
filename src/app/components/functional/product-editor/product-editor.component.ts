import {Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CrudProductService} from '../../../service/crud-product.service';
import {FormObj} from '../../../interfaces/form-obj';
import {FormService} from '../../../service/form.service';
import {Product} from '../../../models/product.model';

@Component({
  selector: 'app-create-product',
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.scss']
})
export class ProductOpenButtonComponent {

  constructor(public dialog: MatDialog) {
  }

  openDialog(): void {
    this.dialog.open(ProductEditCreateFormDialogComponent);
  }
}

//////////////////////////////////////////////////////////

@Component({
  selector: 'app-rate-edit-create-form-dialog',
  templateUrl: 'product-edit-form.html',
  styleUrls: ['./product-editor.component.scss'],
})
export class ProductEditCreateFormDialogComponent implements OnInit {
  templateObj: FormObj;
  isRedact = false;
  constructor(private crudService: CrudProductService,
              @Inject(MAT_DIALOG_DATA) public editingData: Product,
              private formService: FormService) {

    console.log(this.editingData);
    this.formService.getProductFormTemplate().toPromise().then((template) => {
      this.templateObj = template;
    });
  }

  ngOnInit(): void {
  }

  finish(obj): void {
    if (this.editingData) {
      this.edit(obj);
    } else {
      this.add(obj);
    }
  }

  add(preparingItem): void {
    this.crudService.createDocument(preparingItem).toPromise().then(resp => {
      console.log(resp);
    }).catch( error => {
      console.error(error);
    });
  }

  edit(preparingItem): void {
    this.crudService.updateDocument(preparingItem).toPromise().then(resp => {
      console.log(resp);
    }).catch( error => {
      console.error(error);
    });
  }

}


