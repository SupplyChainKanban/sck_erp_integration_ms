import { Module } from '@nestjs/common';
import { ErpIntegrationModule } from './erp-integration/erp-integration.module';
import { CronModule } from './cron/cron.module';

@Module({
  imports: [ErpIntegrationModule, CronModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
