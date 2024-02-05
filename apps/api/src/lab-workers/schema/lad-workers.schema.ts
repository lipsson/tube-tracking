import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true,
})

export class Person {
    @Prop()
    firstName: string;
    @Prop()
    surname: string;
    @Prop()
    buildingId: string;
    @Prop()
    avatar?: string;
};

export const LabWorkersListSchema = SchemaFactory.createForClass(Person)