import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CalificacionesModule } from './calificaciones/calificaciones.module';
import { InventarioModule } from './inventario/inventario.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'mssql-connection',
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'sa',
      password: 'Citlaliñ', 
      database: 'dsm42',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      options: {
        encrypt: false,
      },
    }),
    CalificacionesModule,
    InventarioModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}