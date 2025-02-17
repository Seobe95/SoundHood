import 'dotenv/config';
import * as path from 'path';
import { DataSource } from 'typeorm';

const __dirname = path.resolve();

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [path.join(__dirname, '/**/*.entity.{js, ts}')],
  synchronize: false,
  // 개발용에서만 true로 설정하기
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  migrationsTableName: 'migrations',
  migrations: ['src/migrations/*.{js, ts}'],
});
