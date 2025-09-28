import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Atleta, AtletaSchema } from './atleta.entity';
import { Ciudad, CiudadSchema } from '../ciudad/ciudad.entity';
import { AtletaController } from './atleta.controller';
import { AtletaService } from './atleta.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Atleta.name, schema: AtletaSchema }, 
            { name: Ciudad.name, schema: CiudadSchema }
        ]),
    ],
    controllers: [AtletaController],
    providers: [AtletaService],
    exports: [AtletaService],
})
export class AtletaModule {}