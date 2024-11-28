import {
  resolve
} from 'path';

const dirPath = resolve(__dirname);

import { DataSource, DataSourceOptions } from 'typeorm';

import { Distributor } from '@cat-food-distributor/shared/distributors/data-access';
import { FoodSchedule } from '@cat-food-distributor/shared/food-schedules/data-access';
import { FoodServing } from '@cat-food-distributor/shared/food-servings/data-access';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? +process.env.DB_PORT : 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [FoodServing, Distributor, FoodSchedule],
  migrations: [`${dirPath}/src/db/migrations/**/*.js`],
  subscribers: [`${dirPath}/src/db/subscribers/**/*.js`],
  migrationsTableName: 'migration_table'
};

export default new DataSource(dataSourceOptions);
