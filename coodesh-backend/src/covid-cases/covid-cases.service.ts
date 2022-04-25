import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CovidCase, CovidCaseDocument, CovidCaseSchema } from './schemas/covid-cases.schema';

@Injectable()
export class CovidCasesService {
    constructor(@InjectModel(CovidCase.name) private covidCaseModel: Model<CovidCaseDocument>) { }

    async create(doc: CovidCase) {
        const result = await new this.covidCaseModel(doc).save();
        return result.id;
    }

    async findAll(): Promise<CovidCase[]> {
        return this.covidCaseModel.find().exec();
    }

    async availableDates(): Promise<String[]> {
        return await this.covidCaseModel.find().distinct('date').exec()
    }

    async getCasesGroupedByLocationAndVariant(date: Date) {

        const covidCases = await this.covidCaseModel.aggregate([

            { $match: { date: new Date(date) } },
            {
                $group: {
                    _id: { variant: "$variant" },
                    covidCases: {
                        $push: {
                            case_id: "$_id",
                            num_sequences: "$num_sequences",
                            perc_sequences: "$perc_sequences",
                            num_sequences_total: "$num_sequences_total"
                        }
                    },
                    sum: { $sum: "$num_sequences" }
                },
            },
        ]).exec()
        return covidCases
    }

    async getCumulativeCasesGroupedByLocationAndVariant(date: Date) {
        const covidCases = await this.covidCaseModel.aggregate([

            { $match: { date: { $lt: new Date(date) } } },
            {
                $group: {
                    _id: { location: "$location", variant: "$variant" },
                    covidCases: {
                        $push: {
                            num_sequences: "$num_sequences",
                            perc_sequences: "$perc_sequences",
                            num_sequences_total: "$num_sequences_total"
                        }
                    },
                    sum: { $sum: "$num_sequences" }
                }
            }
        ]).exec()
        return covidCases
    }

    async resetDatabase(): Promise<void> {
        console.log("Removendo todos registros")
        await this.covidCaseModel.remove({})

        const parse = require('csv-parser')
        const fs = require('fs')
        const path = require('path')
        const results = []

        fs.createReadStream(path.join(__dirname, "covid-variants.csv"))
            .pipe(parse())
            .on('data', (data) => results.push(data))
            .on('end', async () => {

                for (let index = 0; index < results.length; index++) {
                    const element = results[index];
                    new this.covidCaseModel(element).save()
                    console.log('Adicionando Registro num: ' + index)
                }

            })
        console.log('Registros adicionados com sucesso')


    }
}
