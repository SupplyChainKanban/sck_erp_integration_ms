import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ErpIntegrationService } from './erp-integration.service';
import { CreateErpIntegrationDto } from './dto/create-erp-integration.dto';

@Controller()
export class ErpIntegrationController {
  constructor(private readonly erpIntegrationService: ErpIntegrationService) { }

  @MessagePattern('send.to.Erp')
  sentOrderToERP(@Payload() createErpIntegrationDto: CreateErpIntegrationDto) {
    return this.erpIntegrationService.sentOrderToERP(createErpIntegrationDto);
  }

}
