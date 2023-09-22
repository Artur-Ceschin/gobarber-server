import 'reflect-metadata'
import express from 'express'
import routes from './routes'
import { AppDataSource } from './database/data-source'

AppDataSource.initialize()
  .then(() => {
    const app = express()

    app.use(express.json())
    app.use(routes)

    app.listen(3333, () => {
      console.log('Application running on port 3333')
    })
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err)
  })
