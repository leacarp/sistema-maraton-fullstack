import { Document } from 'mongoose';
export declare class Atleta extends Document {
    dni: number;
    nombre: string;
    tiempo: string;
    posicion: number;
    ciudadId: string;
}
export declare const AtletaSchema: import("mongoose").Schema<Atleta, import("mongoose").Model<Atleta, any, any, any, Document<unknown, any, Atleta, any, {}> & Atleta & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Atleta, Document<unknown, {}, import("mongoose").FlatRecord<Atleta>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Atleta> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
