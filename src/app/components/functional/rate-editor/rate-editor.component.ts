import {Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CrudService} from '../../../service/crud.service';
import {FormObj} from '../../../interfaces/form-obj';

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
})
export class RateEditCreateFormDialogComponent implements OnInit {
  testFormObj: FormObj;
  constructor(private crudService: CrudService, @Inject(MAT_DIALOG_DATA) public editingData: any) {

    console.log(this.editingData);
    const defaultValue = this.editingData ? this.editingData.payload.doc.data() : false;
    this.testFormObj = {
      name: 'Продукт', steps: [{
        stepName: 'nameStep',
        stepLabel: 'Название',
        fields: [
          {
            name: 'name',
            label: 'Короткое название',
            type: 'text',
            fieldType: 'text-input',
            placeholder: 'Булка...',
            validators: ['required'],
            preparingValue: defaultValue ? defaultValue.name : undefined
          },
          {
            name: 'detailName',
            label: 'Длинное название',
            type: 'text',
            fieldType: 'text-input',
            placeholder: 'Булка очень суровая...',
            validators: ['required'],
            preparingValue: defaultValue ? defaultValue.detailName : undefined
          }
        ]
      },
        {
          stepName: 'ingredientsStep',
          stepLabel: 'Ингридиенты и особенности',
          fields: [
            {
              name: 'ingredients',
              label: 'Ингредиенты',
              placeholder: 'Морковь - 100гр...',
              fieldType: 'chip-list',
              preparingValue: defaultValue ? defaultValue.ingredients : [],
              minTagsQuantity: 4,
              maxTagsQuantity: 20,
              validators: ['required']
            },
            {
              name: 'features',
              label: 'Особенности',
              placeholder: 'С лактозой, острое...',
              fieldType: 'textarea',
              minSymbolsQuality: 10,
              maxSymbolsQuality: 3000,
              minRowsQuality: 1,
              maxRowsQuality: 100,
              validators: ['maxLength'],
              preparingValue: defaultValue ? defaultValue.features : undefined
            }]
        },
        {
          stepName: 'priceStep',
          stepLabel: 'Цена',
          fields: [
            {
              name: 'price',
              label: 'Цена за 100 грам готовой продукции',
              type: 'number',
              fieldType: 'text-input',
              placeholder: '100...',
              validators: ['required', 'numeric'],
              preparingValue: defaultValue ? defaultValue.price : undefined
            }
          ]
        },
        {
          stepName: 'timeStep',
          stepLabel: 'Время',
          fields:
            [
              {
                name: 'time',
                label: 'Время приготовления в часах',
                type: 'number',
                fieldType: 'text-input',
                placeholder: '20...',
                validators: ['required', 'numeric'],
                preparingValue: defaultValue ? defaultValue.time : undefined
              }
            ]
        },
        {
          stepName: 'imageStep',
          stepLabel: 'Фото продукта',
          fields: [
            {
              name: 'image',
              label: 'Фото (рисунок) продукта',
              placeholder: 'Торт.жпег...',
              fieldType: 'images',
              validators: ['required'],
              minImagesQuality: 1,
              maxImagesQuality: 1,
              multiple: false,
              preparingValue: defaultValue ? defaultValue.image : []
            }
          ]
        }
      ]
    };
  }

  ngOnInit(): void {
  }

  finish(obj): void {
    if (this.editingData) {
      this.editRate(obj);
    } else {
      this.addRate(obj);
    }
  }

  addRate(preparingItem): void {
    this.crudService.createDocument(preparingItem, 'menu');
  }

  editRate(preparingItem): void {
    this.crudService.updateDocument(this.editingData.payload.doc.id, preparingItem, 'menu');
  }

}


