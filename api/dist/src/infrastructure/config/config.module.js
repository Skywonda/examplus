"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigMangerModule = void 0;
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const config_service_1 = require("./config.service");
let ConfigMangerModule = class ConfigMangerModule {
};
ConfigMangerModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
            }),
        ],
        providers: [config_service_1.ConfigMangerService],
        exports: [config_service_1.ConfigMangerService],
    })
], ConfigMangerModule);
exports.ConfigMangerModule = ConfigMangerModule;
//# sourceMappingURL=config.module.js.map