import express from 'express'
import NotFoundError from '../helpers/custom-errors/not-found'

const routerQueries = express.Router()

routerQueries.get('/', (req, res) => {
  // coba dapetin query `search`
  if (req.query.search) {
    console.log('search', req.query.search)
  }
  else {
    throw new NotFoundError('Tidak ada query search')
  }

  res.json({
    message: 'success',
    data: req.query,
  })
})

export default routerQueries
