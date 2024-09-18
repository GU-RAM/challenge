export enum ProductTypes {
  Slots = 'სლოტები',
  Mini_Games = 'მინი თამაშები',
  P2P = 'P2P',
  Casino = 'კაზინო',
  Poker = 'პოკერი',
}

export interface Product {
  name: ProductTypes;
  imagePath: string;
  pathName: string;
}
