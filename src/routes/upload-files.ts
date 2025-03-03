import express from 'express'
import formidable from 'formidable'
import fs from 'fs'
import path from 'path'

const uploadRoutes = express.Router()

// Handle file uploads
uploadRoutes.post('/', (req, res) => {
  const uploadDir = path.join(__dirname, '../../public')

  const form = formidable({
    uploadDir,
  })

  form.parse(req, (err, _fields, files) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      })
    }

    const arrayFile = files.file
    if (!arrayFile) {
      return res.status(400).json({
        message: 'No File Uploaded',
      })
    }

    if (Array.isArray(arrayFile)) {
      arrayFile.forEach((file) => {
        const oldPath = file.filepath
        const newPath = path.join(uploadDir, file.originalFilename || '')

        fs.rename(oldPath, newPath, (err) => {
          if (err) throw err
        })
      })
    }
    res.status(201).json({
      message: 'file uploaded',
    })
  })
})

export default uploadRoutes
