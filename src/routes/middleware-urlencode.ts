import express from 'express'

const urlencodedRoute = express.Router()

urlencodedRoute.use(express.urlencoded({ extended: true }))

// untuk kirim data, pakai post, put, patch
urlencodedRoute.post('/', (req, res) => {
  console.log(req.body)
  res.json({
    body: req.body,
  })
})

export default urlencodedRoute
