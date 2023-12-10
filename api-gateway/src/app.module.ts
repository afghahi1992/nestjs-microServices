import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { LoggerModule } from "nestjs-pino";

@Module({
  imports: [UsersModule, LoggerModule.forRoot({
    pinoHttp: {
      safe: true,
      transport: { target: "pino-pretty" },
      msgPrefix: "===>",
    }
  })],
  controllers: [],
  providers: []
})
export class AppModule {
}
