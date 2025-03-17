import express from 'express'
import userController from '../controllers/user-controller'

const userRoutes = express.Router()

userRoutes.post('/users', express.json(), userController.createUser)
userRoutes.get('/users/:id', userController.findUserById)

export default userRoutes
