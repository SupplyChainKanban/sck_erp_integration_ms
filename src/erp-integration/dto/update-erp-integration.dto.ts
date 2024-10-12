import { PartialType } from '@nestjs/mapped-types';
import { CreateErpIntegrationDto } from './create-erp-integration.dto';

export class UpdateErpIntegrationDto extends PartialType(CreateErpIntegrationDto) {
  id: number;
}
