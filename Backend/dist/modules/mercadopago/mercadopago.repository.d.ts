import { Pago } from './pago.entity';
import { DataSource, Repository } from 'typeorm';
export declare class MercadoPagoRepository {
    private readonly mercadoPagoRepository;
    private readonly dataSource;
    constructor(mercadoPagoRepository: Repository<Pago>, dataSource: DataSource);
    getPaymentStatus(id: any, userId: any): Promise<any>;
    createPreference(bodySuscription: any): Promise<any>;
}
