import { MercadoPagoService } from './mercadopago.service';
export declare class MercadoPagoController {
    private readonly mercadoPagoService;
    constructor(mercadoPagoService: MercadoPagoService);
    successPayment(id: any): Promise<{
        message: string;
    }>;
    failurePayment(id: any): Promise<{
        message: string;
    }>;
    pendingPayment(id: any): Promise<{
        message: string;
    }>;
    getPaymentStatus(id: any, userId: any): Promise<any>;
    createPreference(bodySuscription: any): Promise<any>;
}
