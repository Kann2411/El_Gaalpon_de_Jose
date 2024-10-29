import { MercadoPagoRepository } from './mercadopago.repository';
export declare class MercadoPagoService {
    private readonly mercadoPagoRepository;
    constructor(mercadoPagoRepository: MercadoPagoRepository);
    getPaymentStatus(id: any, userId: any): Promise<any>;
    createPreference(bodySuscription: any): Promise<any>;
}
