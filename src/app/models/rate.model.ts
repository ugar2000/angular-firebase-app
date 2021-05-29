export interface Rate {
  rateName: string;
  rateTagline: string;
  tags: Array<string>;
  price: number;
  photos: Array<{ base64: string, name: string }>;
  details: string;
}
