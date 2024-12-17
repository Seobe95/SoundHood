import { DataSource } from 'typeorm';

const isProduction = process.env.NODE_ENV === 'production';

export default new DataSource({
  type: 'postgres',
  host: isProduction ? process.env.DB_HOST : 'localhost',
  port: 5432,
  username: isProduction ? process.env.DB_USERNAME : 'seobe',
  password: isProduction ? process.env.DB_PASSWORD : 'postgres',
  database: isProduction ? process.env.DB_DATABASE : 'soundhood-server',
  entities: [__dirname + '/**/*.entity.{js, ts}'],
  synchronize: false,
  // 개발용에서만 true로 설정하기
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  migrationsTableName: 'migrations',
  migrations: ['src/migrations/**/*.ts'],
});
