
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CovidCasesService } from './covid-cases.service';
import { CovidCase } from './schemas/covid-cases.schema'

@Controller('')
export class CovidCasesController {
    constructor(private service: CovidCasesService) {
    }


    @Post('create')
    create(@Body() covidCase: CovidCase) {
        return this.service.create(covidCase);
    }

    @Get('all')
    all() {
        return this.service.findAll();
    }

    @Get('dates')
    dates() {
        return this.service.availableDates()
    }

    @Get('cases/:date/count')
    getCasesGroupedByLocationAndVariant(@Param() params) {
        return this.service.getCasesGroupedByLocationAndVariant(params.date)
    }

    @Get('cases/:date/cumulative')
    getCasesSumGroupedByLocationAndVariant(@Param() params) {
        return this.service.getCumulativeCasesGroupedByLocationAndVariant(params.date)
    }

}