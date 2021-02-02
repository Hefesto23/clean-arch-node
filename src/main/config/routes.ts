import { Express } from 'express';
import index from '../router/index';
import productId from '../router/product';

export default (app: Express): void => {
  app.use('/', index);
  app.use('/product', productId);
};
