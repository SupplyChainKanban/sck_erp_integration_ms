import { Module } from '@nestjs/common';
import { ErpIntegrationService } from './erp-integration.service';
import { ErpIntegrationController } from './erp-integration.controller';
import { TransportsModule } from 'src/transports/transports.module';

@Module({
  controllers: [ErpIntegrationController],
  providers: [ErpIntegrationService],
  imports: [TransportsModule]
})
export class ErpIntegrationModule { }
