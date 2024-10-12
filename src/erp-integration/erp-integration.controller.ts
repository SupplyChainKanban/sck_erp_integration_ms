import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ErpIntegrationService } from './erp-integration.service';
import { CreateErpIntegrationDto } from './dto/create-erp-integration.dto';
// import { UpdateErpIntegrationDto } from './dto/update-erp-integration.dto';

@Controller()
export class ErpIntegrationController {
  constructor(private readonly erpIntegrationService: ErpIntegrationService) { }

  @MessagePattern('send.to.Erp')
  sentOrderToERP(@Payload() createErpIntegrationDto: CreateErpIntegrationDto) {
    return this.erpIntegrationService.sentOrderToERP(createErpIntegrationDto);
  }

  // @MessagePattern('findAllErpIntegration')
  // findAll() {
  //   return this.erpIntegrationService.findAll();
  // }

  // @MessagePattern('findOneErpIntegration')
  // findOne(@Payload() id: number) {
  //   return this.erpIntegrationService.findOne(id);
  // }

  // @MessagePattern('updateErpIntegration')
  // update(@Payload() updateErpIntegrationDto: UpdateErpIntegrationDto) {
  //   return this.erpIntegrationService.update(updateErpIntegrationDto.id, updateErpIntegrationDto);
  // }

  // @MessagePattern('removeErpIntegration')
  // remove(@Payload() id: number) {
  //   return this.erpIntegrationService.remove(id);
  // }
}
