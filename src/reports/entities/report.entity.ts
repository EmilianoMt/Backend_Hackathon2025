import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { User } from "../../auth/entities/user.entity";

@Schema()
export class Report extends Document {
    @Prop({ auto: true })
    id: string;

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    ubicacion: string;

    @Prop({default: Date.now })
    createdAt: Date;

    @Prop({ type: Types.ObjectId, ref: User.name, required: true })
    userId: Types.ObjectId; 

    @Prop({ required: true })
    file: string;

    @Prop()
    analysis: string;
}

export const ReportSchema = SchemaFactory.createForClass(Report);