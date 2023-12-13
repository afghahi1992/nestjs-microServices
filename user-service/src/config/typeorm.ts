import { registerAs } from "@nestjs/config";
import { config as dotenvConfig } from "dotenv";
// import { DataSource, DataSourceOptions } from "typeorm";
import { ConfigService } from "@nestjs/config";

const configService = new ConfigService();
dotenvConfig({ path: ".env" });

export const config = {
  type: "postgres",
  host: `${configService.get<string>("DB_HOST")}`,
  port: parseInt(configService.get<string>("DB_PORT") || "5432", 10),
  username: `${configService.get<string>("DB_USER")}`,
  password: `${configService.get<string>("DB_PASSWORD")}`,
  database: `${configService.get<string>("DB_NAME")}`,
  entities: ["dist/**/entities/*.entity{.ts,.js}"],
  logging: true,

  synchronize: false,
  migrations: ["dist/migrations/*{.ts,.js}"],
  migrationsRun: false
};

export default registerAs("typeorm", () => config);
// export const connectionSource = new DataSource(config as DataSourceOptions);