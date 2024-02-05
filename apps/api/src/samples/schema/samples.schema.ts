import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { StatusEnum } from "../types/statuses.types";

@Schema({
    timestamps: true,
})

export class Sample {
    @Prop()
    name: string;
    @Prop()
    patientId: string;
    @Prop()
    buildingId: string;
    @Prop()
    archiveBuildingIds: Array<string>;
    @Prop()
    labWorkers: Array<string>;
    @Prop()
    status: StatusEnum;
};

export const SamplesListSchema = SchemaFactory.createForClass(Sample)