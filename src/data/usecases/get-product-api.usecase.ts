import { ProductModel } from "../../domain/models/product.model";
import { IECommerceApiService } from "../../domain/services/ecommerce-api.interface";
import { IGetProduct } from "../../domain/usecases/get-product.interface";

export class GetProductFromApiUseCase implements IGetProduct {
  private readonly eCommerceApiService: IECommerceApiService;

  constructor(eCommerceApiService: IECommerceApiService) {
    this.eCommerceApiService = eCommerceApiService;
  }

  async getProductById(id: number): Promise<ProductModel> {
    return this.eCommerceApiService.getProductById(id);
  }
}
