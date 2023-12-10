import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { LoggerModule } from "nestjs-pino";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [UsersModule, AuthModule, LoggerModule.forRoot({
    pinoHttp: {
      safe: true,
      transport: { target: "pino-pretty" },
      msgPrefix: "===>"
    }
  })],
  controllers: [],
  providers: []
})
export class AppModule {
}
