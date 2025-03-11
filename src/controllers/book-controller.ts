import { Request, Response } from 'express'
import bookService from '../services/book-service'
import bookQuerySchema from './book-validator'

const addBook = (req: Request, res: Response) => {
  const payload = req.body
  console.log(payload)
  if (!payload || !payload.title || !payload.title.trim()) {
    res.status(400).json({
      message: 'Invalid payload',
    })
    return
  }

  if (!payload.id) {
    payload.id = crypto.randomUUID()
  }

  const book = bookService.addBook(payload)
  res.status(201).json({
    message: 'Success',
    data: book,
  })
}

const getBook = (req: Request, res: Response) => {
  const queryString = bookQuerySchema.parse(req.query)
  console.log(queryString)
  res.status(200).json(queryString)
}

export default {
  addBook,
  getBook,
}
