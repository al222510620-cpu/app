import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CalificacionesModule } from './calificaciones/calificaciones.module';
import { InventarioModule } from './inventario/inventario.module';
import { Calificacione } from './calificaciones/entities/calificacione.entity';
import { Inventario } from './inventario/entities/inventario.entity';
import { AlumnosModule } from './alumnos/alumnos.module';
import { Alumno } from './alumnos/entities/alumno.entity';
import { MateriasModule } from './materias/materias.module';
import { Materia } from './materias/entities/materia.entity';
import { Sensor } from './sensors/entities/sensor.entity.js';
import { SensorsModule } from './sensors/sensors.module.js';
import { Tarea } from './tareas/entities/tarea.entity.js';
import { TareasModule } from './tareas/tareas.module.js';
import { User } from './users/entities/user.entity.js';
import { UsersModule } from './users/users.module.js';
import { GaleriaModule } from './galeria/galeria.module';
import { Galeria } from './galeria/entities/galeria.entity';
import { FormulariosModule } from './formularios/formularios.module';
import { Formulario } from './formularios/entities/formulario.entity';
import { PokeapiModule } from './pokeapi/pokeapi.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      name: 'mssql-connection',
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mssql',
        host: config.get<string>('MSSQL_HOST', 'localhost'),
        port: Number(config.get('MSSQL_PORT', 1433)),
        username: config.get<string>('MSSQL_USER', 'sa'),
        password: config.getOrThrow<string>('MSSQL_PASSWORD'),
        database: config.get<string>('MSSQL_DB', 'dsm42'),
        entities: [Tarea, Alumno, Materia, Calificacione, Inventario],
        synchronize: true,
        options: {
          encrypt: false,
        },
      }),
    }),
    TypeOrmModule.forRootAsync({
      name: 'postgres-connection',
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('PG_HOST', 'localhost'),
        port: Number(config.get('PG_PORT', 5433)),
        username: config.getOrThrow<string>('PG_USER'),
        password: config.getOrThrow<string>('PG_PASSWORD'),
        database: config.get<string>('PG_DB', 'dsm42'),
        entities: [User, Galeria, Formulario],
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    TypeOrmModule.forRootAsync({
      name: 'mariadb-connection',
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mariadb',
        host: config.get<string>('MARIADB_HOST', 'localhost'),
        port: Number(config.get('MARIADB_PORT', 3306)),
        username: config.getOrThrow<string>('MARIADB_USER'),
        password: config.getOrThrow<string>('MARIADB_PASSWORD'),
        database: config.get<string>('MARIADB_DB', 'DSM42'),
        entities: [Sensor],
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    AlumnosModule,
    MateriasModule,
    CalificacionesModule,
    InventarioModule,
    UsersModule,
    GaleriaModule,
    FormulariosModule,
    SensorsModule,
    TareasModule,
    PokeapiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
