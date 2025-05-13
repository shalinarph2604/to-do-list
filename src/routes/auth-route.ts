import express from 'express'
import authController from '../controllers/auth-controller'
import userController from '../controllers/user-controller'

const authRoutes = express.Router()

authRoutes.post('/auth/login', express.json(), authController.loginUser)
authRoutes.post('/auth/register', express.json(), userController.createUser)

export default authRoutes
