import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CiudadService } from './ciudad.service';
import { CiudadDto } from './dtos/ciudad.dto';
import { CiudadResponseDto } from './dtos/ciudad.response.dto';

@Controller('ciudades')
export class CiudadController {
    constructor(private readonly ciudadService: CiudadService) {}

    @Get()
    async findAll(): Promise<CiudadResponseDto[]> {
        try {
            const ciudades = await this.ciudadService.findAll();
            return ciudades.map(ciudad => ({
                id: ciudad.id,
                nombre: ciudad.nombre,
            }))
        } catch (error) {
            throw error;
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<CiudadResponseDto> {
        try {
            const ciudad = await this.ciudadService.findOne(id);
            return {
                id: ciudad.id,
                nombre: ciudad.nombre,
            };
        } catch (error) {
            throw error
        }
    }

    @Post()
    async create(@Body() ciudadDto: CiudadDto): Promise<CiudadResponseDto> {
        try {
            const ciudad = await this.ciudadService.create(ciudadDto.nombre);
            return {
                id: ciudad.id,
                nombre: ciudad.nombre,
            };
        } catch (error) {
            throw error;
        }
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() ciudadDto: CiudadDto,
    ): Promise<CiudadResponseDto> {
        try {
            const ciudad = await this.ciudadService.update(id, ciudadDto.nombre);
            return {
                id: ciudad.id,
                nombre: ciudad.nombre,
            };
        } catch (error) {
            throw error;
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<CiudadResponseDto> {
        try {
            const ciudad = await this.ciudadService.delete(id);
            return {
                id: ciudad.id,
                nombre: ciudad.nombre,
            };
        } catch (error) {
            throw error;
        }
    }
}