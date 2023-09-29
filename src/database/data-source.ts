import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'gostack_gobarber',
  entities: ['src/entities/**/*.ts'],
  migrations: ['src/database/migrations/*.ts'],
  subscribers: [],
  synchronize: true,
})
