import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class CreateErpIntegrationDto {


    @IsNotEmpty()
    @IsString()
    @IsUUID()
    public orderId: string;


    // public erpOrderID?: string;

    @IsNotEmpty()
    @IsString()
    // @IsUUID()
    public materialID: string;



    @IsNotEmpty()
    @IsNumber()
    public orderQuantity: number;



    @IsNotEmpty()
    // @IsString()
    @IsDate()
    @Type(() => Date)
    public predictedDate: Date;



}
