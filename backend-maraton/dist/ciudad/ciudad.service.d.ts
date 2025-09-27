import { Model } from 'mongoose';
import { Ciudad } from './ciudad.entity';
export declare class CiudadService {
    private ciudadModel;
    constructor(ciudadModel: Model<Ciudad>);
    findAll(): Promise<Ciudad[]>;
    findOne(id: string): Promise<Ciudad>;
    create(nombre: string): Promise<Ciudad>;
    update(id: string, nombre: string): Promise<Ciudad>;
    delete(id: string): Promise<Ciudad>;
}
