import { Sequelize } from 'sequelize'

const databaseName: string = require('../../package.json').name

const db = new Sequelize(process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`, {
    logging: false
})

export default db