import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { join } from "path";

@Module({
  imports: [
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
  controllers: [AuthController],
  providers: []
})
export class AuthModule {
}
