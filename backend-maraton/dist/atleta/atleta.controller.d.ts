import { AtletaService } from './atleta.service';
import { AtletaDto } from './dtos/atleta.dto';
import { AtletaResponseDto } from './dtos/atleta.response.dto';
export declare class AtletaController {
    private readonly atletaService;
    constructor(atletaService: AtletaService);
    findAll(): Promise<AtletaResponseDto[]>;
    findOne(id: string): Promise<AtletaResponseDto>;
    create(atletaDto: AtletaDto): Promise<AtletaResponseDto>;
    update(id: string, atletaDto: AtletaDto): Promise<AtletaResponseDto>;
    delete(id: string): Promise<AtletaResponseDto>;
}
