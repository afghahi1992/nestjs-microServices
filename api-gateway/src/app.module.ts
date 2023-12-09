import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/entities/user.entity';
import { Auth } from './Auth/entities/auth.entity';
import { TypeOrmModule } from '@nestjs/typeorm';



@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: `.env`,
  }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: '123',
      username: 'postgres',
      entities: [Auth],
      database: 'local',
      synchronize: true,
      logging: true,
    }),UsersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
