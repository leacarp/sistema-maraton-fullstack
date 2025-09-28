import { Model } from 'mongoose';
import { Atleta } from './atleta.entity';
import { Ciudad } from '../ciudad/ciudad.entity';
import { AtletaDto } from './dtos/atleta.dto';
export declare class AtletaService {
    private atletaModel;
    private ciudadModel;
    constructor(atletaModel: Model<Atleta>, ciudadModel: Model<Ciudad>);
    findAll(): Promise<Atleta[]>;
    findOne(id: string): Promise<Atleta>;
    create(atletaDto: AtletaDto): Promise<Atleta>;
    update(id: string, atletaDto: AtletaDto): Promise<Atleta>;
    delete(id: string): Promise<Atleta>;
}
