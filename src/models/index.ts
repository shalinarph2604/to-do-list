import sequelize from '../configs/sequelize'
import User from './User'

async function syncDatabase() {
  await sequelize.sync({ alter: true })
}

syncDatabase().then(async () => {
  console.log('Database synchronized')
})

export {
  User,
}
