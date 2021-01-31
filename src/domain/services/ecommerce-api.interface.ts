import { ErrorModel } from '../models/error.model';
import { ProductModel } from '../models/product.model';

export interface IECommerceApiService {
  getProductById: (id: number) => Promise<ProductModel | ErrorModel>;
}
