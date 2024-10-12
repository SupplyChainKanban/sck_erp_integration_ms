import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateErpIntegrationDto } from './dto/create-erp-integration.dto';
import { PrismaClient } from '@prisma/client';
import { ClientProxy } from '@nestjs/microservices';
import { SCK_NATS_SERVICE } from 'src/config';

interface erpResponse {
  success: Boolean,
  erpOrderID: string,
}

@Injectable()
export class ErpIntegrationService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(ErpIntegrationService.name)

  constructor(@Inject(SCK_NATS_SERVICE) private readonly client: ClientProxy) {
    super()
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Orders DB connected')
  }



  async sentOrderToERP(createErpIntegrationDto: CreateErpIntegrationDto) {
    this.logger.log(`Order ${createErpIntegrationDto.orderId} recibida para procesamiento en el ERP`)

    const erpResponse: erpResponse = await this.sendToERP(createErpIntegrationDto)

    if (erpResponse.success) {
      const erpOrder = await this.eRPOrder.create({
        data: {
          orderId: createErpIntegrationDto.orderId,
          erpOrderID: erpResponse.erpOrderID,
          materialID: createErpIntegrationDto.materialID,
        }
      })

      const erpLog = await this.eRPLog.create({
        data: {
          erpOrderId: erpOrder.id,
          action: 'Enviado al ERP',
          response: 'Orden enviada al ERP con éxito',
        }
      })
      console.log({ erpLog })

      this.client.emit('updateOrderStatus', {
        id: createErpIntegrationDto.orderId,
        status: 'IN_BUYING_PROCESS'
      })

    }
    // return ''
  }




  private async sendToERP(createErpIntegrationDto: CreateErpIntegrationDto): Promise<erpResponse> {

    this.logger.log('Simular la llamada al api del ERP')

    return { success: true, erpOrderID: `ERP12390klñkjasdfañ_${createErpIntegrationDto.orderId}` }

  }


  async checkERPOrdersStatus() {

    //TODO: Obtener todas las órdenes que estén en proceso
    const erpOrders = await this.eRPOrder.findMany({
      where: {
        status: 'inProcess'
      }
    })

    console.log(erpOrders)
    // for(const erpOrder of erpOrders) {



    //   const erpResponse = await this.getERPOrderStatus(erpOrder.erpOrderID);

    //   if (erpResponse.status === 'Completed') {
    //     //TODO: Editar estado de la ordenalERP

    //     //TODO: Envíe la actualización de estado al microservicio de órdenes BOUGHT

    //     //TODO: Envíe la inserción al microservicio de ingestión para que pase el ciclo completo y se almacene la compra.
    //   } else if (erpResponse.status === 'Failed') {
    //     //TODO: Editar estado de la ordenalERP a Failed

    //     //TODO: Envíe la actualización de estado al microservicio de órdenes DISMISSED

    //   }

    //   //TODO: GUARDAR EL LOG DE LA ORDEN: 


    // }




  }



  private async getERPOrderStatus(erpOrderID: string) {
    this.logger.log(`Simulando la consulta del estado de la orden al ERP con id: ${erpOrderID}`)

    return { status: 'Completed', fechaRealDeCompra: new Date(), quantity: 100 }; // Failed, InProcess


  }



  // create(createErpIntegrationDto: CreateErpIntegrationDto) {
  //   return 'This action adds a new erpIntegration';
  // }

  // findAll() {
  //   return `This action returns all erpIntegration`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} erpIntegration`;
  // }

  // update(id: number, updateErpIntegrationDto: UpdateErpIntegrationDto) {
  //   return `This action updates a #${id} erpIntegration`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} erpIntegration`;
  // }
}
