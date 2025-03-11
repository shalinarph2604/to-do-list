import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import CustomError from './helpers/custom-errors/custom-error'
import routerBooks from './routes/books'
import jwtRoutes from './routes/jwt'
import jsonRoute from './routes/middleware-json'
import txtRoute from './routes/middleware-text'
import urlencodedRoute from './routes/middleware-urlencode'
import routerParams from './routes/params'
import routerQueries from './routes/queries'
import uploadRoutes from './routes/upload-files'
import sessionRoutes from './routes/session'

const app = express()
const port = 3000

app.use(cors())
app.use(morgan('dev'))

app.use('/books', routerBooks)
app.use('/query', routerQueries)
app.use('/params', routerParams)
app.use('/json', jsonRoute)
app.use('/urlencoded', urlencodedRoute)
app.use('/text', txtRoute)
app.use('/public', express.static('public'))
app.use('/upload', uploadRoutes)
app.use('/jwt', jwtRoutes)
app.use('/session', sessionRoutes)

const homePageHandler = (_req, res) => {
  res.json({
    message: 'hello from Express',
  })
}

app.get('/', homePageHandler)
app.get('/hello', homePageHandler)

// mengambil query dari url
app.get('/query', (req, res) => {
  const query = req.query
  res.json({
    query,
  })
})

// mengambil params dari url
app.post('/', (req, res) => {
  const body = req.body
  console.info(body.name)
  res.json({
    body,
  })
})

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

app.listen(port, () => {
  console.info('Server running at port ', port)
})
