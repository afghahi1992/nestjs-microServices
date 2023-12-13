"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
var common_1 = require("@nestjs/common");
var users_service_1 = require("./users.service");
var create_user_dto_1 = require("./dto/create-user.dto");
var update_user_dto_1 = require("./dto/update-user.dto");
var get_user_dto_1 = require("./dto/get-user.dto");
var microservices_1 = require("@nestjs/microservices");
var remove_user_dto_1 = require("./dto/remove-user.dto");
var nestjs_grpc_exceptions_1 = require("nestjs-grpc-exceptions");
var UsersController = (function () {
    function UsersController(usersService) {
        this.usersService = usersService;
    }
    UsersController.prototype.create = function (createUserDto) {
        return __awaiter(this, void 0, void 0, function () {
            var name, email, password, age, serviceResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = createUserDto === null || createUserDto === void 0 ? void 0 : createUserDto.name;
                        email = createUserDto === null || createUserDto === void 0 ? void 0 : createUserDto.email;
                        password = createUserDto === null || createUserDto === void 0 ? void 0 : createUserDto.password;
                        age = +(createUserDto === null || createUserDto === void 0 ? void 0 : createUserDto.age);
                        return [4, this.usersService.create(name, email, password, age)];
                    case 1:
                        serviceResult = _a.sent();
                        return [2, { msg: "user ".concat(serviceResult.name, " added") }];
                }
            });
        });
    };
    UsersController.prototype.findAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var serviceResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.usersService.findAll()];
                    case 1:
                        serviceResult = _a.sent();
                        return [2, { users: serviceResult }];
                }
            });
        });
    };
    UsersController.prototype.findOne = function (getUserDto) {
        return __awaiter(this, void 0, void 0, function () {
            var id, serviceResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = +(getUserDto === null || getUserDto === void 0 ? void 0 : getUserDto.id);
                        return [4, this.usersService.findOne(id)];
                    case 1:
                        serviceResult = _a.sent();
                        if (serviceResult)
                            return [2, serviceResult];
                        throw new nestjs_grpc_exceptions_1.GrpcNotFoundException("user not found.");
                }
            });
        });
    };
    UsersController.prototype.update = function (updateUserDto) {
        return __awaiter(this, void 0, void 0, function () {
            var id, name, age, serviceResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(updateUserDto);
                        id = +(updateUserDto === null || updateUserDto === void 0 ? void 0 : updateUserDto.id);
                        name = updateUserDto === null || updateUserDto === void 0 ? void 0 : updateUserDto.name;
                        age = +(updateUserDto === null || updateUserDto === void 0 ? void 0 : updateUserDto.age);
                        return [4, this.usersService.update(id, name, age)];
                    case 1:
                        serviceResult = _a.sent();
                        console.log("======-----========");
                        console.log(serviceResult.affected);
                        console.log("======-----========");
                        if (serviceResult.affected)
                            return [2, { msg: "user ".concat(name, " edited") }];
                        throw new nestjs_grpc_exceptions_1.GrpcNotFoundException("user not found.");
                }
            });
        });
    };
    UsersController.prototype.remove = function (removeUserDto) {
        return __awaiter(this, void 0, void 0, function () {
            var id, serviceResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = +(removeUserDto === null || removeUserDto === void 0 ? void 0 : removeUserDto.id);
                        return [4, this.usersService.remove(id)];
                    case 1:
                        serviceResult = _a.sent();
                        console.log("======-----========");
                        console.log(serviceResult.affected);
                        console.log("======-----========");
                        if (serviceResult.affected)
                            return [2, { msg: "user ".concat(id, " deleted") }];
                        throw new nestjs_grpc_exceptions_1.GrpcNotFoundException("user not found.");
                }
            });
        });
    };
    __decorate([
        (0, microservices_1.GrpcMethod)("UserService", "create"),
        __param(0, (0, common_1.Body)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
        __metadata("design:returntype", Promise)
    ], UsersController.prototype, "create", null);
    __decorate([
        (0, microservices_1.GrpcMethod)("UserService", "findAll"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], UsersController.prototype, "findAll", null);
    __decorate([
        (0, microservices_1.GrpcMethod)("UserService", "findOne"),
        __param(0, (0, common_1.Body)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [get_user_dto_1.GetUserDto]),
        __metadata("design:returntype", Promise)
    ], UsersController.prototype, "findOne", null);
    __decorate([
        (0, microservices_1.GrpcMethod)("UserService", "update"),
        __param(0, (0, common_1.Body)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [update_user_dto_1.UpdateUserDto]),
        __metadata("design:returntype", Promise)
    ], UsersController.prototype, "update", null);
    __decorate([
        (0, microservices_1.GrpcMethod)("UserService", "remove"),
        __param(0, (0, common_1.Body)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [remove_user_dto_1.RemoveUserDto]),
        __metadata("design:returntype", Promise)
    ], UsersController.prototype, "remove", null);
    UsersController = __decorate([
        (0, common_1.Controller)("users"),
        __metadata("design:paramtypes", [users_service_1.UsersService])
    ], UsersController);
    return UsersController;
}());
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map