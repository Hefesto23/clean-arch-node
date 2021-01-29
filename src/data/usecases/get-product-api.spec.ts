import { GetProductFromApiUseCase } from './get-product-api.usecase';
import { ProductModel } from '../../domain/models/product.model';
import { IECommerceApiService } from '../../domain/services/ecommerce-api.interface';

class ECommerceApiServiceStub implements IECommerceApiService {
  async getProductById(id: number): Promise<ProductModel> {
    const productExample = {
      id,
      sku: 'any_sku',
      name: 'any_name',
      price: 250,
      requestedOn: 'any_date',
    };
    return new Promise((resolve) => resolve(productExample));
  }
}

describe('GetProductFromApi use case', () => {
  let eCommerceApiServiceStub: ECommerceApiServiceStub;
  let getProductFromApi: GetProductFromApiUseCase;

  beforeEach(() => {
    eCommerceApiServiceStub = new ECommerceApiServiceStub();
    getProductFromApi = new GetProductFromApiUseCase(eCommerceApiServiceStub);
  });

  it('should call api with correct id', async () => {
    const productId = 1200;
    const apiSpy = jest.spyOn(eCommerceApiServiceStub, 'getProductById');
    await getProductFromApi.getProductById(productId);
    expect(apiSpy).toHaveBeenCalledWith(1200);
  });

  it('should return expected product', async () => {
    const productId = 111;
    const useCaseResult = await getProductFromApi.getProductById(productId);
    expect(useCaseResult).toEqual({
      id: 111,
      sku: 'any_sku',
      name: 'any_name',
      price: 250,
      requestedOn: 'any_date',
    });
  });

  it('should throw api error', async () => {
    const productId = 1200;
    jest
      .spyOn(eCommerceApiServiceStub, 'getProductById')
      .mockRejectedValueOnce(new Error('One Api Error'));
    const apiError = getProductFromApi.getProductById(productId);
    await expect(apiError).rejects.toThrowError('One Api Error');
  });
});
