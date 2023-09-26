import { DataSource } from 'typeorm'

import { AlterTypeAndAddColumnsInCreateAppointments1695392336063 } from './migrations/1695392336063-AlterTypeAndAddColumnsInCreateAppointments'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'gostack_gobarber',
  entities: ['src/entities/**/*.ts'],
  migrations: [AlterTypeAndAddColumnsInCreateAppointments1695392336063],
  subscribers: [],
  synchronize: true,
})
