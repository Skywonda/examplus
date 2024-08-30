import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigMangerService } from 'src/infrastructure/config/config.service';
export type TransactionPropType = Awaited<ReturnType<DatabaseService['transaction']>>;
export declare class DatabaseService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    private readonly logger;
    constructor(config: ConfigMangerService);
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    transaction(): Promise<Omit<PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends">>;
}
