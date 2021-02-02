import { GetProductByIdController } from './get-product-by-id.controller';
import { ILogger } from '../logger/logger.interface';
import { GetProductFromApiUseCase } from '../../data/usecases/get-product-api.usecase';
import { BigCommerceApiService } from '../../infra/big-commerce-api/bc-api-service';
import { AxiosHttpHandler } from '../../infra/http-handler/axios-http-handler';
import { Validator } from '../validation/validate-number-input';

jest.mock('../../infra/big-commerce-api/bc-api-service');
jest.mock('../../infra/http-handler/axios-http-handler');

describe('GetProductByIdController handle method', () => {
  let getProductByIdController: GetProductByIdController;
  let getProductFromApiUseCase: GetProductFromApiUseCase;
  let logger: ILogger;
  let req: any;
  let res: any;

  class Logger implements ILogger {
    info(msg: string): any {
      return msg;
    }

    warn(msg: string): any {
      return msg;
    }

    error(msg: string): any {
      return msg;
    }
  }

  beforeEach(() => {
    req = {
      params: {
        id: '',
      },
    };
    res = {
      propStatus: null,
      propJson: null,
      status(code) {
        this.propStatus = code;
        return this;
      },
      json(json) {
        this.propJson = json;
        return this;
      },
    };
    getProductFromApiUseCase = new GetProductFromApiUseCase(
      new BigCommerceApiService(new AxiosHttpHandler()),
    );
    logger = new Logger();
    getProductByIdController = new GetProductByIdController(
      getProductFromApiUseCase,
      logger,
    );
  });

  it('should call validator with id param', async () => {
    req.params.id = '18';
    jest.spyOn(Validator, 'isPositiveInteger');
    await getProductByIdController.handle(req, res);
    expect(Validator.isPositiveInteger).toBeCalledWith('18');
  });

  it('should return 400 bad request if validator is falsy', async () => {
    req.params.id = 'notNumber';
    jest.spyOn(Validator, 'isPositiveInteger').mockReturnValueOnce(false);
    await getProductByIdController.handle(req, res);
    expect(res.propStatus).toEqual(400);
    expect(res.propJson).toEqual({
      status: 400,
      message: 'BAD_REQUEST: Invalid id',
    });
  });

  it('should return 404 not found if validated and api does not found the product', async () => {
    req.params.id = '99999';
    const notFoundResponse = {
      status: 404,
      message: 'A product with the id of 99999 was not found',
    };
    // set validator to return true
    jest.spyOn(Validator, 'isPositiveInteger').mockReturnValueOnce(true);
    // set use case to return predefined response
    jest
      .spyOn(getProductFromApiUseCase, 'getProductById')
      .mockResolvedValueOnce(notFoundResponse);
    await getProductByIdController.handle(req, res);
    expect(res.propStatus).toEqual(404);
    expect(res.propJson).toEqual(notFoundResponse);
  });

  it('should return 400 bad request if api does not validate the input', async () => {
    req.params.id = '99999';
    const invalidInputResponse = {
      status: 400,
      message: 'Input is invalid',
    };
    // set validator to return true
    jest.spyOn(Validator, 'isPositiveInteger').mockReturnValueOnce(true);
    // set use case to return predefined response
    jest
      .spyOn(getProductFromApiUseCase, 'getProductById')
      .mockResolvedValueOnce(invalidInputResponse);
    await getProductByIdController.handle(req, res);
    expect(res.propStatus).toEqual(400);
    expect(res.propJson).toEqual(invalidInputResponse);
  });

  it('should return 200 if param is correct', async () => {
    req.params.id = '1100';
    const okResponse = {
      id: 1100,
      sku: 'any_sku',
      name: 'any_name',
      price: 200,
      requestedOn: '2021-01-26 14:07:40',
    };
    // set validator to return true
    jest.spyOn(Validator, 'isPositiveInteger').mockReturnValueOnce(true);
    // set use case to return predefined response
    jest
      .spyOn(getProductFromApiUseCase, 'getProductById')
      .mockResolvedValueOnce(okResponse);
    await getProductByIdController.handle(req, res);
    expect(res.propStatus).toEqual(200);
    expect(res.propJson).toEqual(okResponse);
  });

  it('should return 500 if an unexpected error occurs', async () => {
    req.params.id = '1100';
    const internalServerError = {
      message: 'INTERNAL_SERVER_ERROR',
      status: 500,
    };
    // set validator to return true
    jest.spyOn(Validator, 'isPositiveInteger').mockReturnValueOnce(true);
    // set use case to return predefined response
    jest
      .spyOn(getProductFromApiUseCase, 'getProductById')
      .mockRejectedValueOnce(new Error('Something Unexpected!'));
    await getProductByIdController.handle(req, res);
    expect(res.propStatus).toEqual(500);
    expect(res.propJson).toEqual(internalServerError);
  });
});
