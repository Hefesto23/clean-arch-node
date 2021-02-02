import { ErrorModel } from '../../domain/models/error.model';
import { ErrorDto } from '../dto/error.dto';
import { ProductModel } from '../../domain/models/product.model';
import { IECommerceApiService } from '../../domain/services/ecommerce-api.interface';
import { ProductDto } from './dtos/product.dto';
import { IHttpHandler } from '../../domain/services/http-handler.interface';
import {
  BC_HASH,
  BC_HTTP_HEADER,
  URL_BIG_COMMERCE,
} from '../../config/api-variables';

export class BigCommerceApiService implements IECommerceApiService {
  private readonly httpHandler: IHttpHandler;

  constructor(httpHandler: IHttpHandler) {
    this.httpHandler = httpHandler;
  }

  async getProductById(productId: number): Promise<ProductModel | ErrorModel> {
    return this.httpHandler
      .get(
        `${URL_BIG_COMMERCE}${BC_HASH}/v3/catalog/products/${productId}`,
        BC_HTTP_HEADER,
      )
      .then((response) => new ProductDto(response.data))
      .catch((error) => {
        if (
          error.response &&
          (error.response.status === 400 || error.response.status === 404)
        )
          return new ErrorDto(error.response);
        throw error;
      });
  }
}
