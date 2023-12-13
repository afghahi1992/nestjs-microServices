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
exports.UsersService = void 0;
var common_1 = require("@nestjs/common");
var user_entity_1 = require("./entities/user.entity");
var bcrypt = require("bcrypt");
var roles_enum_1 = require("./enum/roles.enum");
var typeorm_1 = require("typeorm");
var typeorm_2 = require("@nestjs/typeorm");
var nestjs_grpc_exceptions_1 = require("nestjs-grpc-exceptions");
var UsersService = (function () {
    function UsersService(userRepository) {
        this.userRepository = userRepository;
    }
    UsersService.prototype.create = function (name, email, password, age) {
        return __awaiter(this, void 0, void 0, function () {
            var hashedPassword, user, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4, bcrypt.hash(password, 10)];
                    case 1:
                        hashedPassword = _a.sent();
                        user = new user_entity_1.User();
                        user.name = name;
                        user.age = age;
                        user.email = email;
                        user.password = hashedPassword;
                        user.type = roles_enum_1.type.USER;
                        return [4, this.userRepository.save(user)];
                    case 2: return [2, _a.sent()];
                    case 3:
                        error_1 = _a.sent();
                        if (error_1.code === "23505")
                            throw new nestjs_grpc_exceptions_1.GrpcAlreadyExistsException("email must be unique.");
                        console.error(error_1);
                        throw new nestjs_grpc_exceptions_1.GrpcInternalException("internal exception.");
                    case 4: return [2];
                }
            });
        });
    };
    UsersService.prototype.findAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.userRepository.find()];
                    case 1: return [2, _a.sent()];
                    case 2:
                        error_2 = _a.sent();
                        console.error(error_2);
                        throw new nestjs_grpc_exceptions_1.GrpcInternalException("internal exception.");
                    case 3: return [2];
                }
            });
        });
    };
    UsersService.prototype.findOne = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.userRepository.findOneBy({ id: id })];
                    case 1: return [2, _a.sent()];
                    case 2:
                        error_3 = _a.sent();
                        console.error(error_3);
                        throw new nestjs_grpc_exceptions_1.GrpcInternalException("internal exception.");
                    case 3: return [2];
                }
            });
        });
    };
    UsersService.prototype.update = function (id, name, age) {
        return __awaiter(this, void 0, void 0, function () {
            var error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.userRepository
                                .createQueryBuilder()
                                .update(user_entity_1.User)
                                .set({ name: name, age: age })
                                .where("id = :id", { id: id })
                                .execute()];
                    case 1: return [2, _a.sent()];
                    case 2:
                        error_4 = _a.sent();
                        console.error(error_4);
                        throw new nestjs_grpc_exceptions_1.GrpcInternalException("internal exception.");
                    case 3: return [2];
                }
            });
        });
    };
    UsersService.prototype.remove = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.userRepository.delete(id)];
                    case 1: return [2, _a.sent()];
                    case 2:
                        error_5 = _a.sent();
                        console.error(error_5);
                        throw new nestjs_grpc_exceptions_1.GrpcInternalException("internal exception.");
                    case 3: return [2];
                }
            });
        });
    };
    UsersService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
        __metadata("design:paramtypes", [typeorm_1.Repository])
    ], UsersService);
    return UsersService;
}());
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map