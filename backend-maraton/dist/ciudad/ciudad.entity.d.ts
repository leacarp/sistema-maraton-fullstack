import { Document } from 'mongoose';
export declare class Ciudad extends Document {
    nombre: string;
}
export declare const CiudadSchema: import("mongoose").Schema<Ciudad, import("mongoose").Model<Ciudad, any, any, any, Document<unknown, any, Ciudad, any, {}> & Ciudad & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Ciudad, Document<unknown, {}, import("mongoose").FlatRecord<Ciudad>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Ciudad> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
