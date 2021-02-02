import { Request, Response } from 'express';

import { GetProductFromApiUseCase } from '../../data/usecases/get-product-api.usecase';
import { BigCommerceApiService } from '../../infra/big-commerce-api/bc-api-service';
import { AxiosHttpHandler } from '../../infra/http-handler/axios-http-handler';
import { GetProductByIdController } from '../../presentation/controllers/get-product-by-id.controller';
import { logger } from '../logger/logger';

export const makeGetProductByIdController = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const getProductFromApiUseCase = new GetProductFromApiUseCase(
    new BigCommerceApiService(new AxiosHttpHandler()),
  );
  const getProductByIdController = new GetProductByIdController(
    getProductFromApiUseCase,
    logger,
  );
  return getProductByIdController.handle(req, res);
};
