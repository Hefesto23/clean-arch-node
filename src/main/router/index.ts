import { Router } from 'express';

const router = new Router();

export default router.get('/', (req, res) => {
  res.send('Server is up');
});
