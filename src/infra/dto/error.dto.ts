import { ErrorModel } from '../../domain/models/error.model';

export class ErrorDto implements ErrorModel {
  status: number;

  message: string;

  constructor(res?: Record<string, any>, status?: number, message?: string) {
    this.status = res && res.data ? res.data.status : status;
    this.message = res && res.data ? res.data.title : message;
  }
}
