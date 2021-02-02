import { Request, Response } from 'express';

import { ErrorDto } from '../../infra/dto/error.dto';
import { ILogger } from '../logger/logger.interface';
import { GetProductFromApiUseCase } from '../../data/usecases/get-product-api.usecase';
import { IController } from './controller.interface';
import { Validator } from '../validation/validate-number-input';

export class GetProductByIdController implements IController {
  private readonly getProductFromApiUseCase: GetProductFromApiUseCase;

  private readonly logger: ILogger;

  constructor(
    getProductFromApiUseCase: GetProductFromApiUseCase,
    logger: ILogger,
  ) {
    this.getProductFromApiUseCase = getProductFromApiUseCase;
    this.logger = logger;
  }

  async handle(req: Request, res: Response): Promise<Response> {
    this.logger.info('Starting GetProductByIdController...');
    try {
      const { id } = req.params;
      if (!Validator.isPositiveInteger(id)) {
        this.logger.warn(`bad request with input/id: ${id}`);
        const badRequestError = new ErrorDto(
          undefined,
          400,
          'BAD_REQUEST: Invalid id',
        );
        return res.status(400).json(badRequestError);
      }

      const responseModel = await this.getProductFromApiUseCase.getProductById(
        parseInt(id),
      );

      if ('status' in responseModel) {
        if (responseModel.status === 400) {
          this.logger.warn(`bad request with input/id: ${id}`);
          return res.status(400).json(responseModel);
        }
        if (responseModel.status === 404) {
          this.logger.warn(`product not found with id: ${id}`);
          return res.status(404).json(responseModel);
        }
      }
      return res.status(200).json(responseModel);
    } catch (error) {
      this.logger.error('!Something Unexpected occurred...!');
      this.logger.error(error);
      const serverError = new ErrorDto(undefined, 500, 'INTERNAL_SERVER_ERROR');
      return res.status(500).json(serverError);
    }
  }
}
