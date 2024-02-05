import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true,
})

export class Users {
    @Prop()
    name: string

    @Prop({ unique: [true, 'Duplicate email'] })
    email: string;

    @Prop()
    password: string;

    @Prop()
    isAdmin: boolean;

    @Prop()
    avatar?: string;
};

export const UsersListSchema = SchemaFactory.createForClass(Users)