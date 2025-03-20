import express from 'express'
import userController from '../controllers/user-controller'

const userRoutes = express.Router()

userRoutes.post('/users', express.json(), userController.createUser)
userRoutes.get('/users/:id', userController.findUserById)
userRoutes.put('/users/:id', userController.updateUserById)
userRoutes.delete('/users/:id', userController.deleteUserById)
userRoutes.get('/users', userController.findAndCountAllUsers)

export default userRoutes
