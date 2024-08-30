import {
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
  Logger,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ENVIRONMENTAL_VARIABLES } from 'src/infrastructure/constants';
import { ConfigMangerService } from 'src/infrastructure/config/config.service';

export type TransactionPropType = Awaited<
  ReturnType<DatabaseService['transaction']>
>;
@Injectable()
export class DatabaseService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(DatabaseService.name);
  constructor(config: ConfigMangerService) {
    const url = config.get(ENVIRONMENTAL_VARIABLES.DATABASE_URL);

    super({
      datasources: {
        db: {
          url,
        },
      },
      // log: ['query', 'info', 'warn'],
    });
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log('database connected');
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  transaction() {
    return this.$transaction(async (trx) => trx);
  }
}
