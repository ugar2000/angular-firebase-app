export interface Rate {
  rateName: string;
  rateTagline: string;
  tags: Array<string>;
  price: number;
  photos: Array<{name: string, src: string}>;
  details: string;
}
