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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const database_service_1 = require("../../infrastructure/database/database.service");
const hashing_service_1 = require("../../infrastructure/service/hashing.service");
let AuthService = class AuthService {
    constructor(_db, jwtService, hashingService) {
        this._db = _db;
        this.jwtService = jwtService;
        this.hashingService = hashingService;
    }
    async authenticate(email, password, type = 'STUDENT') {
        const user = await this._db.user.findUnique({ where: { email } });
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        const isPasswordMatch = await this.hashingService.verify(user.password, password);
        if (!isPasswordMatch) {
            throw new common_1.UnauthorizedException('Invalid password');
        }
        if (user.type !== type) {
            throw new common_1.UnauthorizedException('Invalid user type');
        }
        const token = await this.generateToken(user);
        const { password: _password } = user, result = __rest(user, ["password"]);
        return Object.assign(Object.assign({}, result), { token });
    }
    async generateToken(user) {
        const payload = { email: user.email, id: user.id, type: user.type };
        return this.jwtService.sign(payload);
    }
    async register(payload) {
        const existingUser = await this._db.user.findUnique({
            where: { email: payload.email },
        });
        if (existingUser) {
            throw new common_1.ConflictException('Email already in use');
        }
        const hashedPassword = await this.hashingService.hash(payload.password);
        const newUser = await this._db.user.create({
            data: Object.assign(Object.assign({}, payload), { password: hashedPassword }),
        });
        const token = await this.generateToken(newUser);
        const { password: _password } = newUser, result = __rest(newUser, ["password"]);
        return Object.assign(Object.assign({}, result), { token });
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        jwt_1.JwtService,
        hashing_service_1.HashingService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map