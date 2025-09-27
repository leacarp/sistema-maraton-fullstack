import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Ciudad extends Document {
    @Prop({ required: true, trim: true, minlength: 2 })
    nombre: string;
}

export const CiudadSchema = SchemaFactory.createForClass(Ciudad);
