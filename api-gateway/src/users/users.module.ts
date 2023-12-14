import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { join } from "path";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`
    }),
    ClientsModule.register([
      {
        name: "TRANSFERPROTO_PACKAGE",
        transport: Transport.GRPC,
        options: {
          url: `${process.env.GRPC_URL}:${process.env.GRPC_PORT}`,
          package: "transferproto",
          protoPath: join(__dirname, "../proto/transfer.proto")
        }
      }
    ])
  ],
  controllers: [UsersController],
  providers: []
})
export class UsersModule {
}
