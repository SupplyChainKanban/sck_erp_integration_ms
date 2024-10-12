import { Module } from '@nestjs/common';
import { ErpIntegrationModule } from './erp-integration/erp-integration.module';
import { CronModule } from './cron/cron.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ErpIntegrationModule,
    CronModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
