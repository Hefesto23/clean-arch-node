import axios from 'axios';
import { IHttpHandler } from '../../domain/services/http-handler.interface';

export class AxiosHttpHelper implements IHttpHandler {
  async get(url: string, headers: Record<string, unknown>): Promise<any> {
    return axios.get(url, {
      headers,
    });
  }
}
