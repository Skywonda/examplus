import { ConfigService } from '@nestjs/config';
import { ENVIRONMENTAL_VARIABLES } from '../constants';
import { OnApplicationBootstrap } from '@nestjs/common';
type keyUnion = keyof typeof ENVIRONMENTAL_VARIABLES;
export declare class ConfigMangerService implements OnApplicationBootstrap {
    private config;
    constructor(config: ConfigService);
    get(key: keyUnion): string;
    onApplicationBootstrap(): void;
}
export {};
