import { Injectable } from '@nestjs/common';
import { ErpIntegrationService } from '../erp-integration/erp-integration.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class CronService {

  constructor(
    private readonly erpIntegrationService: ErpIntegrationService
  ) {

  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async checkERPOrdersStatus() {

    await this.erpIntegrationService.checkERPOrdersStatus();

  }

}
