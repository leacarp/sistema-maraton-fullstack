import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CiudadModule } from './ciudad/ciudad.module';
import { AtletaModule } from './atleta/atleta.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/maraton_db'),
    
    CiudadModule,
    AtletaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
