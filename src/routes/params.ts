import express from 'express'

const routerParams = express.Router()

routerParams.get('/:id', (req, res) => {
  // coba dapetin params `id`
  if (req.params.id) console.log('params id:', req.params.id)

  res.json({
    message: 'success',
    data: req.params,
  })
})

routerParams.get('/test', (req, res) => {
  // coba dapetin params `id`

  res.json({
    message: 'success',
    data: 'root endpoint /params/test',
  })
})

routerParams.get('/:bookId/page/:id', (req, res) => {
  // coba dapetin params `firstId`
  if (req.params.id) console.log('params firstId:', req.params.id)

  // coba dapetin params `secondId`
  if (req.params.id) console.log('params secondId:', req.params.id)

  res.json({
    message: 'success',
    data: req.params,
  })
})

export default routerParams
