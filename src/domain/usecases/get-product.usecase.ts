import { ProductModel } from "../models/product.model";

export interface IdOfProduct {
  id: number;
}

export interface IGetProduct {
  getProductById: (id: IdOfProduct) => Promise<ProductModel>;
}
