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
exports.AuthService = void 0;
var common_1 = require("@nestjs/common");
var bcrypt = require("bcrypt");
var roles_enum_1 = require("../users/enum/roles.enum");
var JWT = require("jsonwebtoken");
var typeorm_1 = require("typeorm");
var user_entity_1 = require("../users/entities/user.entity");
var process = require("process");
var typeorm_2 = require("@nestjs/typeorm");
var auth_entity_1 = require("./entities/auth.entity");
var nestjs_grpc_exceptions_1 = require("nestjs-grpc-exceptions");
var AuthService = (function () {
    function AuthService(userRepository, authRepository) {
        this.userRepository = userRepository;
        this.authRepository = authRepository;
    }
    AuthService.prototype.signUp = function (name, email, password, age) {
        return __awaiter(this, void 0, void 0, function () {
            var user, hashedPassword, userModel, result, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.userRepository.findOneBy({ email: email })];
                    case 1:
                        user = _a.sent();
                        if (user)
                            throw new nestjs_grpc_exceptions_1.GrpcAlreadyExistsException("already exist!");
                        return [4, bcrypt.hash(password, 10)];
                    case 2:
                        hashedPassword = _a.sent();
                        userModel = {
                            name: name,
                            email: email,
                            age: age,
                            password: hashedPassword,
                            type: roles_enum_1.type.USER
                        };
                        return [4, this.userRepository.save(userModel)];
                    case 3:
                        result = _a.sent();
                        return [4, this.generateToken(email, userModel.type, result.id)];
                    case 4:
                        token = _a.sent();
                        return [4, this.authRepository.save({ token: token, email: email })];
                    case 5:
                        _a.sent();
                        return [2, token];
                }
            });
        });
    };
    AuthService.prototype.signIn = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var user, isUserValid, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.userRepository.findOneBy({ email: email })];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            throw new nestjs_grpc_exceptions_1.GrpcNotFoundException("user not found!");
                        return [4, bcrypt.compare(password, user.password)];
                    case 2:
                        isUserValid = _a.sent();
                        if (!isUserValid)
                            throw new nestjs_grpc_exceptions_1.GrpcUnauthenticatedException("Invalid Credential");
                        return [4, this.generateToken(email, user.type, user.id)];
                    case 3:
                        token = _a.sent();
                        return [4, this.authRepository
                                .createQueryBuilder()
                                .update(auth_entity_1.Auth)
                                .set({ token: token })
                                .where("email = :email", { email: email })
                                .execute()];
                    case 4:
                        _a.sent();
                        return [2, token];
                }
            });
        });
    };
    AuthService.prototype.generateToken = function (email, type, id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, JWT.sign({
                        email: email,
                        type: type,
                        id: id
                    }, process.env.TOKEN_KEY, {
                        expiresIn: 7 * 3600 * 24
                    })];
            });
        });
    };
    AuthService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
        __param(1, (0, typeorm_2.InjectRepository)(auth_entity_1.Auth)),
        __metadata("design:paramtypes", [typeorm_1.Repository,
            typeorm_1.Repository])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map