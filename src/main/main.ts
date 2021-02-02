import app from './config/app';
import { API_PORT } from '../config/api-variables';
import { logger } from './logger/logger';

async function bootstrap() {
  await app.listen(API_PORT || 3030, () =>
    logger.info(`Server running in localhost:${API_PORT || 3000}`),
  );
}

bootstrap();
