import { ConfigMangerService } from 'src/infrastructure/config/config.service';
declare const LoginStrategy_base: new (...args: any[]) => any;
export declare class LoginStrategy extends LoginStrategy_base {
    constructor(config: ConfigMangerService);
    private static extractJwt;
    validate<T>(payload: T): T;
}
export {};
