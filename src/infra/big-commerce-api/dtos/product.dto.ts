import { ProductModel } from '../../../domain/models/product.model';

export class ProductDto implements ProductModel {
  id: number;

  sku: string;

  name: string;

  price: number;

  requestedOn: string;

  constructor(res: Record<string, any>) {
    this.id = res.data.id;
    this.sku = res.data.sku;
    this.name = res.data.name;
    this.price = res.data.price;
    this.requestedOn = `${
      new Date()
        .toISOString() // Default London TimeZone
        .replace(/T/, ' ') // replace T with a space
        .replace(/\..+/, '') // delete the dot and everything after}`;
    }`;
  }
}
