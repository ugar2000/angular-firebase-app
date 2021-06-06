interface Field {
  name: string;
  label: string;
  fieldType: string;
  placeholder: string;
  validators: Array<'email' | 'required' | 'minLength' | 'maxLength' | 'mobile' | 'price' | 'numeric'>;
}

export interface StringField extends Field{
  type: string;
  preparingValue?: string;
}

export interface ChipListField extends Field{
  minTagsQuantity: number;
  maxTagsQuantity: number;
  preparingValue?: Array<string>;
}

export interface  Textarea extends Field{
  minSymbolsQuality: number;
  maxSymbolsQuality: number;
  minRowsQuality: number;
  maxRowsQuality: number;
  preparingValue?: string;
}

export interface ImagesField extends Field {
  minImagesQuality: number;
  maxImagesQuality: number;
  preparingValue: Array<{ base64: string, name: string }>;
}

export interface FormObj {
  name: string;
  steps: Array<{
    stepName: string;
    fields: Array<StringField | ChipListField | Textarea | ImagesField>;
  }>;
}
