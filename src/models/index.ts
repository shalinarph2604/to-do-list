import sequelize from '../configs/sequelize'
import User from './User'

async function syncDatabase() {
  await sequelize.sync({ alter: true })
}

export {
  syncDatabase,
  User,
}
