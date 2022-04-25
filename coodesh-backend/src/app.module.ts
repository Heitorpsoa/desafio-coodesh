import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CovidCasesModule } from './covid-cases/covid-cases.module';


const mongo_uri = 'mongodb+srv://heitor:ZyWWw0mEbZJArJyH@cluster0-6cwey.gcp.mongodb.net/test?retryWrites=true&w=majority'
@Module({
  imports: [MongooseModule.forRoot(mongo_uri), CovidCasesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
