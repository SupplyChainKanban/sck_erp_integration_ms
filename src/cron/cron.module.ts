import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { ErpIntegrationModule } from 'src/erp-integration/erp-integration.module';

@Module({
  controllers: [],
  providers: [CronService],
  exports: [CronModule],
  imports: [ErpIntegrationModule]
})
export class CronModule { }
