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
exports.AuthGuard = void 0;
var common_1 = require("@nestjs/common");
var JWT = require("jsonwebtoken");
var process = require("process");
var public_decorator_1 = require("./decorators/public.decorator");
var core_1 = require("@nestjs/core");
var typeorm_1 = require("@nestjs/typeorm");
var auth_entity_1 = require("./entities/auth.entity");
var typeorm_2 = require("typeorm");
var nestjs_grpc_exceptions_1 = require("nestjs-grpc-exceptions");
var AuthGuard = (function () {
    function AuthGuard(reflector, authRepository) {
        this.reflector = reflector;
        this.authRepository = authRepository;
    }
    AuthGuard.prototype.canActivate = function (context) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var isPublic, token, payload, oldToken, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        isPublic = this.reflector.getAllAndOverride(public_decorator_1.IS_PUBLIC_KEY, [
                            context.getHandler(),
                            context.getClass()
                        ]);
                        if (isPublic) {
                            return [2, true];
                        }
                        token = (_a = context.switchToHttp().getRequest()) === null || _a === void 0 ? void 0 : _a.token;
                        console.log("=======token=======");
                        console.log(token);
                        console.log("=======token=======");
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        if (!token)
                            throw new Error("token does not exist");
                        payload = JWT.verify(token, process.env.TOKEN_KEY);
                        console.log("=======payload=======");
                        console.log(payload);
                        console.log("=======payload=======");
                        return [4, this.getTokenFromDB(payload === null || payload === void 0 ? void 0 : payload.email)];
                    case 2:
                        oldToken = _b.sent();
                        if (oldToken !== token)
                            throw new Error("expired token");
                        return [3, 4];
                    case 3:
                        error_1 = _b.sent();
                        if (error_1.message === "token does not exist")
                            throw new nestjs_grpc_exceptions_1.GrpcUnauthenticatedException("token does not exist, please login first!");
                        if (error_1.message === "expired token")
                            throw new nestjs_grpc_exceptions_1.GrpcUnauthenticatedException("expired token, please send new token!");
                        if (error_1.message === "invalid signature")
                            throw new nestjs_grpc_exceptions_1.GrpcUnauthenticatedException("invalid token, please correct your token!");
                        console.error(error_1);
                        throw new nestjs_grpc_exceptions_1.GrpcInternalException("internal exception.");
                    case 4: return [2, true];
                }
            });
        });
    };
    AuthGuard.prototype.getTokenFromDB = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.authRepository.findOneBy({ email: email })];
                    case 1:
                        user = _a.sent();
                        console.log("=======user=======");
                        console.log(user);
                        console.log("=======user=======");
                        return [2, user === null || user === void 0 ? void 0 : user.token];
                }
            });
        });
    };
    AuthGuard = __decorate([
        (0, common_1.Injectable)(),
        __param(1, (0, typeorm_1.InjectRepository)(auth_entity_1.Auth)),
        __metadata("design:paramtypes", [core_1.Reflector,
            typeorm_2.Repository])
    ], AuthGuard);
    return AuthGuard;
}());
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=auth.guard.js.map