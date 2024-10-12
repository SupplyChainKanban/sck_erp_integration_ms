import { Module } from '@nestjs/common';
import { ErpIntegrationService } from './erp-integration.service';
import { ErpIntegrationController } from './erp-integration.controller';

@Module({
  controllers: [ErpIntegrationController],
  providers: [ErpIntegrationService],
})
export class ErpIntegrationModule {}
