import { CiudadService } from './ciudad.service';
import { CiudadDto } from './dtos/ciudad.dto';
import { CiudadResponseDto } from './dtos/ciudad.response.dto';
export declare class CiudadController {
    private readonly ciudadService;
    constructor(ciudadService: CiudadService);
    findAll(): Promise<CiudadResponseDto[]>;
    findOne(id: string): Promise<CiudadResponseDto>;
    create(ciudadDto: CiudadDto): Promise<CiudadResponseDto>;
    update(id: string, ciudadDto: CiudadDto): Promise<CiudadResponseDto>;
    delete(id: string): Promise<CiudadResponseDto>;
}
