import app from './config/app';

async function bootstrap() {
  await app.listen(3000, () => console.log(`Server running in localhost:3000`));
}

bootstrap();
