import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Atleta } from './atleta.entity';
import { Ciudad } from '../ciudad/ciudad.entity';
import { AtletaDto } from './dtos/atleta.dto';

@Injectable()
export class AtletaService {
    constructor(@InjectModel(Atleta.name) private atletaModel: Model<Atleta>, @InjectModel(Ciudad.name) private ciudadModel: Model<Ciudad>) {}

    async findAll(): Promise<Atleta[]> {
        return this.atletaModel.find().populate('ciudadId', 'nombre').exec();
    }

    async findOne(id: string): Promise<Atleta> {
        if (!id || id.trim() === '') {
            throw new BadRequestException('ID es requerido');
        }

        const atleta = await this.atletaModel.findById(id).populate('ciudadId', 'nombre').exec();
        if (!atleta) {
            throw new NotFoundException(`Atleta con ID: ${id} no encontrado`);
        }
        return atleta;
    }

    async create(atletaDto: AtletaDto): Promise<Atleta> {
        const dniAtletaExistente = await this.atletaModel.findOne({ dni: atletaDto.dni }).exec();
        if (dniAtletaExistente) {
            throw new BadRequestException('El atleta con ese DNI ya existe');
        }

        const ciudadExistente = await this.ciudadModel.findById(atletaDto.ciudadId).exec();
        if (!ciudadExistente) {
            throw new NotFoundException(`Ciudad con ID: ${atletaDto.ciudadId} no encontrada`);
        }

        const nuevoAtleta = new this.atletaModel(atletaDto);
        return nuevoAtleta.save();
    }

    async update(id: string, atletaDto: AtletaDto): Promise<Atleta> {
        const dniAtletaExistente = await this.atletaModel.findOne({ dni: atletaDto.dni, _id: { $ne: id } }).exec();
        if (dniAtletaExistente) {
            throw new BadRequestException('El atleta con ese DNI ya existe');
        }

        const ciudadExistente = await this.ciudadModel.findById(atletaDto.ciudadId).exec();
        if (!ciudadExistente) {
            throw new NotFoundException(`Ciudad con ID: ${atletaDto.ciudadId} no encontrada`);
        }

        const result = await this.atletaModel.findByIdAndUpdate(id, atletaDto, { new: true }).exec();
        if (!result) {
            throw new NotFoundException(`Atleta con ID ${id} no encontrado`);
        }
        return result;
    }

    async delete(id: string): Promise<Atleta> {
        if (!id || id.trim() === '') {
            throw new BadRequestException('ID es requerido');
        }
        
        const atletaEliminado = await this.atletaModel.findByIdAndDelete(id).exec();
        if (!atletaEliminado) {
            throw new NotFoundException(`Atleta con ID ${id} no encontrado`);
        }
        return atletaEliminado;
    }

}
