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
      host: "localhost",
      port: 5432,
      password: "123",
      username: "postgres",
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
