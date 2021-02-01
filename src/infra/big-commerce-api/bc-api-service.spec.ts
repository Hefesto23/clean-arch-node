import { AxiosHttpHandler } from '../http-handler/axios-http-handler';
import { BigCommerceApiService } from './bc-api-service';

jest.mock('../http-handler/axios-http-handler');
jest.mock('../../config/api-variables', () => ({
  URL_BIG_COMMERCE: 'any_url/',
  BC_HASH: 'any_hash',
  BC_HTTP_HEADER: {
    header_property1: 'any_value',
    header_property2: 'any_value',
  },
}));

describe('AxiosHttpHandler class', () => {
  let axiosHandler: AxiosHttpHandler;
  let bcApi: BigCommerceApiService;

  beforeEach(() => {
    axiosHandler = new AxiosHttpHandler();
    bcApi = new BigCommerceApiService(axiosHandler);
  });

  it('should call helper with correct params', async (done) => {
    // Url Address handler will use
    const expectedUrl = 'any_url/any_hash/v3/catalog/products/10';
    // headers set in config
    const expectedHeader = {
      header_property1: 'any_value',
      header_property2: 'any_value',
    };

    jest.spyOn(axiosHandler, 'get').mockResolvedValueOnce({
      data: {
        data: {
          id: 10,
          sku: 'any_sku',
          name: 'any_name',
          price: 200,
        },
      },
    });
    await bcApi.getProductById(10);
    expect(axiosHandler.get).toHaveBeenCalledWith(expectedUrl, expectedHeader);
    done();
  });

  it('should return manipulated data', async (done) => {
    const expectedProduct = {
      id: 10,
      name: 'any_name',
      price: 200,
      requestedOn: expect.any(String),
      sku: 'any_sku',
    };
    // mock value Handler will return
    jest.spyOn(axiosHandler, 'get').mockResolvedValueOnce({
      data: {
        data: {
          id: 10,
          sku: 'any_sku',
          notImportantField1: 'any_value',
          name: 'any_name',
          notImportantField2: 'any_value',
          price: 200,
        },
      },
    });
    const result = await bcApi.getProductById(10);
    expect(result).toEqual(expectedProduct);
    done();
  });

  it('should not throw error if status is 400 or 404', async (done) => {
    const expectedReturn = {
      status: 404,
      message: 'product not found',
    };
    // mock value Handler will return
    jest.spyOn(axiosHandler, 'get').mockRejectedValueOnce({
      response: {
        status: 404,
        data: {
          status: 404,
          title: 'product not found',
        },
      },
    });
    // product with not found id
    const result = await bcApi.getProductById(9999);
    expect(result).toEqual(expectedReturn);
    done();
  });

  it('should throw error if something unexpected occurs', async (done) => {
    // mock value Handler will return
    jest
      .spyOn(axiosHandler, 'get')
      .mockRejectedValueOnce(new Error('Something Bad!'));
    const errorResponse = bcApi.getProductById(5);
    await expect(errorResponse).rejects.toThrowError('Something Bad!');
    done();
  });
});
