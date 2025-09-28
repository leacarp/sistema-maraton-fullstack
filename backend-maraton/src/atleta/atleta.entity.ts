import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Atleta extends Document {
    @Prop({ required: true, unique: true })
    dni: number;
    @Prop({ required: true, trim: true, minlength: 2 })
    nombre: string;
    @Prop({ required: true, trim: true })
    tiempo: string;
    @Prop({ required: true })
    posicion: number;
    @Prop({ type: Types.ObjectId, ref: 'Ciudad', required: true })
    ciudadId: string;
}

export const AtletaSchema = SchemaFactory.createForClass(Atleta);