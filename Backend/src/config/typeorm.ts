import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env' });

const config = {
  type: 'postgres',
  database: process.env.DB_DATEBASE,
  host: process.env.HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  autoLoadEntities: true,
  //dropSchema: true,
  synchronize: true,
  logging: true,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: [__dirname + '/../migrations/**/*.{js,ts}'],
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
