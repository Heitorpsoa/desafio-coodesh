import { NestFactory } from '@nestjs/core';
import { application } from 'express';
import { AppModule } from './app.module';
import { CovidCasesService } from './covid-cases/covid-cases.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const command = process.argv[2];

  switch (command) {
    case 'reset-database':
      console.log('Vou resetar a database');
      const covidCasesService = app.get(CovidCasesService)
      covidCasesService.resetDatabase()
      break;
    default:
      app.enableCors()
      await app.listen(3000);
      console.log('Listening on port 3000');
      break;
  }

}
bootstrap();
