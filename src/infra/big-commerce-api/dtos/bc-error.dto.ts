import { ErrorModel } from '../../../domain/models/error.model';

export class BcErrorDto implements ErrorModel {
  status: number;

  message: string;

  constructor(res: Record<string, any>) {
    this.status = res.data.status;
    this.message = res.data.title;
  }
}
