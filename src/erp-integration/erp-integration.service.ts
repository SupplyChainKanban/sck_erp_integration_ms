import { Injectable } from '@nestjs/common';
import { CreateErpIntegrationDto } from './dto/create-erp-integration.dto';
import { UpdateErpIntegrationDto } from './dto/update-erp-integration.dto';

@Injectable()
export class ErpIntegrationService {
  create(createErpIntegrationDto: CreateErpIntegrationDto) {
    return 'This action adds a new erpIntegration';
  }

  findAll() {
    return `This action returns all erpIntegration`;
  }

  findOne(id: number) {
    return `This action returns a #${id} erpIntegration`;
  }

  update(id: number, updateErpIntegrationDto: UpdateErpIntegrationDto) {
    return `This action updates a #${id} erpIntegration`;
  }

  remove(id: number) {
    return `This action removes a #${id} erpIntegration`;
  }
}
