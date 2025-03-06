import express, { Request, Response } from 'express'
import session from 'express-session'

const sessionRoutes = express.Router()

const user = { id: 1, username: 'user' }

sessionRoutes.use(session({
  secret: 'secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  },
}))

declare module 'express-session' {
  interface SessionData {
    userId: number
  }
}

sessionRoutes.post('/login', (req, res) => {
  req.session.userId = user.id
  res.json({ user })
})

sessionRoutes.post('/verify', (req: Request, res: Response) => {
  if (req.session.userId) {
    res.json({
      user,
    })
    return
  }
  res.status(401).json({ message: 'Unauthorized: Please login' })
})

sessionRoutes.post('/logout', (req: Request, res: Response) => {
  if (req.session.userId) {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({ message: 'Error logging out' })
        return
      }
      res.clearCookie('connect.sid')
      res.json({ message: 'Logout successful' })
      return
    })
  } else {
    res.status(401).json({ message: 'Unauthorized: Please login' })
  }
})

export default sessionRoutes
