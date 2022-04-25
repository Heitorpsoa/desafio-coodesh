import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type CovidCaseDocument = CovidCase & Document

@Schema()
export class CovidCase {
    @Prop()
    location: string;

    @Prop()
    date: Date;

    @Prop()
    variant: string;

    @Prop()
    num_sequences: number;

    @Prop()
    perc_sequences: number;

    @Prop()
    num_sequences_total: number;
}

export const CovidCaseSchema = SchemaFactory.createForClass(CovidCase)