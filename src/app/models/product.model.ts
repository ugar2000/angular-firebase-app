export interface ProductData {
  name: string;
  price: number;
  image: Array<{ name: string; src: string }>;
  details: string;
}

export interface Product extends ProductData {
  id: string;
}
