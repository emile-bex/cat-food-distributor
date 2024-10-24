import {
  resolve
} from 'path'

const dirPath = resolve(__dirname)

import { DataSource } from 'typeorm'

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? +process.env.DB_PORT : 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [`${dirPath}/src/app/**/*.entity.ts`],
  migrations: [`${dirPath}/src/migrations/**/*.ts`],
  subscribers: [`${dirPath}/src/subscribers/**/*.ts`],
  migrationsTableName: 'migration_table',
})
