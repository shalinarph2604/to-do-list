import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import CustomError from './helpers/custom-errors/custom-error'
import uploadRoutes from './routes/upload-files'
import userRoutes from './routes/user-route'

// init database
import { syncDatabase } from './models'

const app = express()
const port = 3000

app.use(cors())
app.use(morgan('dev'))

const homePageHandler = (_req, res) => {
  res.json({
    message: 'hello from Express',
  })
}

app.get('/', homePageHandler)

app.use('/public', express.static('public'))
app.use('/upload', uploadRoutes)
app.use('/', userRoutes)

// middleware error
const errorLogger = (err, _req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      message: err.message,
    })
  }

  try {
    const parseMessage = JSON.parse(err.message)
    return res.status(400).json({
      message: 'Validation Error',
      errors: parseMessage,
    })
  } catch (error) {
    console.log(error)
  }

  res.status(500).json({
    message: err.message,
  })
  next()
}

app.use(errorLogger)

app.listen(port, async () => {
  await syncDatabase().then(async () => {
    console.log('Database synchronized')
  })
  console.info('Server running at port ', port)
})
