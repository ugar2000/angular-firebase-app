export interface ProductData {
  name: string;
  tags: Array<string>;
  price: number;
  photos: Array<{ name: string; src: string }>;
  details: string;
}

export interface Product extends ProductData {
  id: string;
}
