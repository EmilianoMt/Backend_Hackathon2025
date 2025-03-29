import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema()
export class User extends Document {
    @Prop({ auto: true })
    id: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    lastName: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Report' }] })
    reports: Types.ObjectId[]; 
}

export const UserSchema = SchemaFactory.createForClass(User);