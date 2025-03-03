import express from 'express'

const txtRoute = express.Router()

txtRoute.use(express.text())

// untuk kirim data, pakai post, put, patch
txtRoute.post('/', (req, res) => {
  console.log(req.body)
  res.json({
    body: req.body,
  })
})

export default txtRoute
