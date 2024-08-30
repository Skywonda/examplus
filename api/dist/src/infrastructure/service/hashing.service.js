"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashingService = void 0;
const common_1 = require("@nestjs/common");
const argon2 = require("argon2");
let HashingService = class HashingService {
    async hash(data) {
        return argon2.hash(data, {
            type: argon2.argon2id,
            memoryCost: 2 ** 16,
            timeCost: 3,
            parallelism: 1,
        });
    }
    async verify(hashedData, plainData) {
        return argon2.verify(hashedData, plainData);
    }
};
HashingService = __decorate([
    (0, common_1.Injectable)()
], HashingService);
exports.HashingService = HashingService;
//# sourceMappingURL=hashing.service.js.map