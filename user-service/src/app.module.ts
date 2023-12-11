import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users/entities/user.entity";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { Auth } from "./auth/entities/auth.entity";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432', 10),
      password: process.env.DB_PASSWORD,
      username: process.env.DB_USER,
      entities: [User, Auth],
      database: "local",
      synchronize: true,
      logging: true
    }),
    UsersModule,
    AuthModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {
}
