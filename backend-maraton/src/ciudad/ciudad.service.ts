import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ciudad } from './ciudad.entity';

@Injectable()
export class CiudadService {
    constructor(@InjectModel(Ciudad.name) private ciudadModel: Model<Ciudad>) {}

    async findAll(): Promise<Ciudad[]> {
        return this.ciudadModel.find().exec();
    }

    async findOne(id: string): Promise<Ciudad> {
        if (!id || id.trim() === '') {
            throw new BadRequestException('ID es requerido');
        }
        
        const ciudad = await this.ciudadModel.findById(id).exec();
        if (!ciudad){
            throw new NotFoundException(`Ciudad con ID: ${id} no encontrada`);
        }
        return ciudad;
    }

    async create(nombre: string): Promise<Ciudad> {
        const ciudadExistente = await this.ciudadModel.findOne({ nombre }).exec();
        if (ciudadExistente){
            throw new BadRequestException('La ciudad ya existe');
        }
        const nuevaCiudad = new this.ciudadModel({ nombre });
        return nuevaCiudad.save();
    }

    async update(id: string, nombre: string): Promise<Ciudad> {
        const ciudadExistente = await this.ciudadModel.findOne({ nombre, _id: { $ne: id } }).exec();

        if (ciudadExistente){
            throw new BadRequestException('La ciudad ya existe');
        }

        const result = await this.ciudadModel.findByIdAndUpdate(id, { nombre }, { new: true }).exec();

        if (!result){
            throw new NotFoundException(`Ciudad con ID ${id} no encontrada`);
        }
        return result;
    }

    async delete(id: string): Promise<Ciudad> {
        if (!id || id.trim() === '') {
            throw new BadRequestException('ID es requerido');
        }
        
        const ciudadEliminada = await this.ciudadModel.findByIdAndDelete(id).exec();
        if (!ciudadEliminada){
            throw new NotFoundException(`Ciudad con ID ${id} no encontrada`);
        }
        return ciudadEliminada;
    }
}