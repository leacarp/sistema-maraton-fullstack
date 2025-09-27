import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Ciudad, CiudadSchema } from './ciudad.entity';
import { CiudadController } from './ciudad.controller';
import { CiudadService } from './ciudad.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Ciudad.name, schema: CiudadSchema }]),
    ],
    controllers: [CiudadController],
    providers: [CiudadService],
})
export class CiudadModule {}
