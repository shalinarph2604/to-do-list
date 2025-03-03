import express from 'express'

const jsonRoute = express.Router()

jsonRoute.use(express.json())

// untuk kirim data, pakai post, put, patch
jsonRoute.post('/', (req, res) => {
  console.log(req.body)
  res.json({
    body: req.body,
  })
})

export default jsonRoute
