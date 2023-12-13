"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var users_module_1 = require("./users/users.module");
var typeorm_1 = require("@nestjs/typeorm");
var user_entity_1 = require("./users/entities/user.entity");
var config_1 = require("@nestjs/config");
var auth_module_1 = require("./auth/auth.module");
var auth_entity_1 = require("./auth/entities/auth.entity");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [
                config_1.ConfigModule.forRoot({
                    isGlobal: true,
                    envFilePath: ".env"
                }),
                typeorm_1.TypeOrmModule.forRoot({
                    type: "postgres",
                    host: process.env.DB_HOST,
                    port: parseInt(process.env.DB_PORT || '5432', 10),
                    password: process.env.DB_PASSWORD,
                    username: process.env.DB_USER,
                    entities: [user_entity_1.User, auth_entity_1.Auth],
                    database: "local",
                    synchronize: true,
                    logging: true
                }),
                users_module_1.UsersModule,
                auth_module_1.AuthModule
            ],
            controllers: [],
            providers: []
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map