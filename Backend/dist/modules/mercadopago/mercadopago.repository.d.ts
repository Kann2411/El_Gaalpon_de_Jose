import { Pago } from './pago.entity';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';
export declare class MercadoPagoRepository {
    private readonly mercadoPagoRepository;
    constructor(mercadoPagoRepository: Repository<Pago>);
    getPaymentStatus(preferenceId: UUID): Promise<any>;
    createPreference(bodySuscription: any): Promise<any>;
}
