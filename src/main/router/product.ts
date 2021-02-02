import { Router } from 'express';
import { makeGetProductByIdController } from '../api-implementations/getProductById';

const router = new Router();

export default router.get('/:id', makeGetProductByIdController);
