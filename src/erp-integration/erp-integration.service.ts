import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateErpIntegrationDto } from './dto/create-erp-integration.dto';
import { ERPOrderStatus, PrismaClient } from '@prisma/client';
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

    for (const erpOrder of erpOrders) {
      const erpResponse = await this.getERPOrderStatus(erpOrder.erpOrderID);

      if (erpResponse.status === 'Completed') {
        console.log('LLegó a completado')
        await this.changeERPOrderStatus(erpOrder.id, 'Completed');

        this.client.emit('updateOrderStatus', {
          id: erpOrder.orderId,
          status: 'BOUGHT'
        })

        //     //TODO: Envíe la inserción al microservicio de ingestión para que pase el ciclo completo y se almacene la compra.


      } else if (erpResponse.status === 'Failed') {
        console.log('LLegó a Failed')
        await this.changeERPOrderStatus(erpOrder.id, 'Failed');

        this.client.emit('updateOrderStatus', {
          id: erpOrder.orderId,
          status: 'DISMISSED'
        })

      }

      const erpLog = await this.eRPLog.create({
        data: {
          erpOrderId: erpOrder.id,
          action: 'CheckOrderStatus',
          response: `Estado de la orden en el ERP: ${erpResponse.status}`,
        }
      })
      console.log('Desde el chequeo de status', erpLog)
    }


  }



  private async getERPOrderStatus(erpOrderID: string) {
    this.logger.log(`Simulando la consulta del estado de la orden al ERP con id: ${erpOrderID}`)

    return { status: 'Completed', fechaRealDeCompra: new Date(), quantity: 100 }; // Failed, InProcess


  }

  private async changeERPOrderStatus(id: string, status: ERPOrderStatus) {
    try {
      await this.eRPOrder.update({
        where: { id },
        data: { status }
      })
    } catch (error) {

    }
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
