import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true,
})

export class Building {
    @Prop()
    name: string;
    @Prop()
    city: string;
    @Prop()
    geolocation: [string, string];
    @Prop()
    isInUse: boolean;
};

export const BuildingsListSchema = SchemaFactory.createForClass(Building)