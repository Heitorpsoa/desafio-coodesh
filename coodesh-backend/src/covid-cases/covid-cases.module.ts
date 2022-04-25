import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CovidCasesController } from './covid-cases.controller';
import { CovidCasesService } from './covid-cases.service';
import { CovidCase, CovidCaseSchema } from './schemas/covid-cases.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: CovidCase.name, schema: CovidCaseSchema }])],
    controllers: [CovidCasesController],
    providers: [CovidCasesService],
})
export class CovidCasesModule { }