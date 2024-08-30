"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const config_service_1 = require("./infrastructure/config/config.service");
const login_strategy_1 = require("./infrastructure/auth/strategies/login.strategy");
const database_module_1 = require("./infrastructure/database/database.module");
const auth_module_1 = require("./application/auth/auth.module");
const config_module_1 = require("./infrastructure/config/config.module");
const infrastructure_modules_1 = require("./infrastructure/infrastructure.modules");
const exam_module_1 = require("./application/exam/exam.module");
const user_module_1 = require("./application/user/user.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        exports: [config_service_1.ConfigMangerService],
        providers: [login_strategy_1.LoginStrategy, config_service_1.ConfigMangerService],
        imports: [
            database_module_1.PrismaModule,
            auth_module_1.AuthModule,
            exam_module_1.ExamModule,
            user_module_1.UserModule,
            passport_1.PassportModule,
            config_module_1.ConfigMangerModule,
            infrastructure_modules_1.InfrastructureModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map