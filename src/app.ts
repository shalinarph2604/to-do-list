import express from 'express'
import routerBooks from './routes/books'

const app = express()
const port = 3000

// middleware untuk parsing payload json
const jsonParser = express.json()

app.use(jsonParser)

app.use('/books', routerBooks)

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
// app.get('/:username', (req, res) => {
//   const params = req.params
//   res.json({
//     params,
//   })
// })

// mengambil params dari url
app.post('/', (req, res) => {
  const body = req.body
  console.info(body.name)
  res.json({
    body,
  })
})

// mengambil params dari url
app.post('/json', jsonParser, (req, res) => {
  const body = req.body
  console.info(body.name)
  res.json({
    body,
  })
})

// middleware error
const errorLogger = (err, _req, res, next) => {
  console.error(err)
  res.status(500).json({
    message: err.message,
  })
  next()
}

app.use(errorLogger)

app.listen(port, () => {
  console.info('Server running at port ', port)
})
