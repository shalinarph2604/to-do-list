import { Sequelize } from 'sequelize'

if (!process.env.POSTGRES_CONNECTION_STRING) {
  throw new Error('POSTGRES_CONNECTION_STRING is not set in env')
}

const sequelize = new Sequelize(process.env.POSTGRES_CONNECTION_STRING)

async function testConnection() {
  await sequelize.authenticate()
  console.log('Database connected!')
}

testConnection()

export default sequelize
