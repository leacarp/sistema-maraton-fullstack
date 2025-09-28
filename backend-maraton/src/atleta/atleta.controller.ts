import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { AtletaService } from './atleta.service';
import { AtletaDto } from './dtos/atleta.dto';
import { AtletaResponseDto } from './dtos/atleta.response.dto';

@Controller('atletas')
export class AtletaController {
    constructor(private readonly atletaService: AtletaService) {}

    @Get()
    async findAll(): Promise<AtletaResponseDto[]> {
        const atletas = await this.atletaService.findAll();
        return atletas.map(atleta => ({
            id: atleta.id,
            dni: atleta.dni,
            nombre: atleta.nombre,
            tiempo: atleta.tiempo,
            posicion: atleta.posicion,
            ciudad: (atleta.ciudadId as any)?.nombre || '',
        }));
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<AtletaResponseDto> {
        try {
            const atleta = await this.atletaService.findOne(id);
            return {
                id: atleta.id,
                dni: atleta.dni,
                nombre: atleta.nombre,
                tiempo: atleta.tiempo,
                posicion: atleta.posicion,
                ciudad: (atleta.ciudadId as any)?.nombre || '',
            };
        } catch (error) {
            throw error;
        }
    }

    @Post()
    async create(@Body() atletaDto: AtletaDto): Promise<AtletaResponseDto> {
        try {
            const atleta = await this.atletaService.create(atletaDto);

            const atletaConCiudad = await this.atletaService.findOne(atleta.id);

            return {
                id: atletaConCiudad.id,
                dni: atletaConCiudad.dni,
                nombre: atletaConCiudad.nombre,
                tiempo: atletaConCiudad.tiempo,
                posicion: atletaConCiudad.posicion,
                ciudad: (atletaConCiudad.ciudadId as any)?.nombre || '',
            };
        } catch (error) {
            throw error;
        }
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() atletaDto: AtletaDto): Promise<AtletaResponseDto> {
        try {
            const atleta = await this.atletaService.update(id, atletaDto);

            const atletaConCiudad = await this.atletaService.findOne(atleta.id);

            return {
                id: atletaConCiudad.id,
                dni: atletaConCiudad.dni,
                nombre: atletaConCiudad.nombre,
                tiempo: atletaConCiudad.tiempo,
                posicion: atletaConCiudad.posicion,
                ciudad: (atletaConCiudad.ciudadId as any)?.nombre || '',
            };
        } catch (error) {
            throw error;
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<AtletaResponseDto> {
        try {
            const atleta = await this.atletaService.delete(id);
            return {
                id: atleta.id,
                dni: atleta.dni,
                nombre: atleta.nombre,
                tiempo: atleta.tiempo,
                posicion: atleta.posicion,
                ciudad: (atleta.ciudadId as any)?.nombre || '',
            };
        } catch (error) {
            throw error;
        }
    }
}