import express from 'express'
import jwt from '../helpers/jwt'

const jwtRoutes = express.Router()

const user = { id: 1, username: 'user' }

jwtRoutes.post('/login', async (req, res) => {
  const token = await jwt.generateToken(user, '1d')
  res.json({ token })
})

jwtRoutes.post('/verify', express.json(), async (req, res) => {
  const token = req.body.token
  const decoded = await jwt.verifyToken(token)
  res.json({ decoded })
})

jwtRoutes.post('/verify-header', async (req, res) => {
  const authorization = req.headers.authorization
  if (!authorization) {
    res.status(401).json({
      message: 'Not Authorized',
    })
    return
  }

  const token = authorization?.replace('Bearer', '').trim()
  if (!token) {
    res.status(401).json({
      message: 'Not Authorized',
    })
    return
  }

  try {
    const decoded = await jwt.verifyToken(token)
    res.json({ decoded })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    res.status(401).json({
      message: 'Not Authorized',
    })
  }
})

export default jwtRoutes
