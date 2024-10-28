import { DataSource } from 'typeorm';
declare const _default: (() => {
    type: string;
    database: string;
    host: string;
    port: string;
    username: string;
    password: string;
    autoLoadEntities: boolean;
    dropSchema: boolean;
    synchronize: boolean;
    entities: string[];
    migrations: string[];
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    type: string;
    database: string;
    host: string;
    port: string;
    username: string;
    password: string;
    autoLoadEntities: boolean;
    dropSchema: boolean;
    synchronize: boolean;
    entities: string[];
    migrations: string[];
}>;
export default _default;
export declare const connectionSource: DataSource;
