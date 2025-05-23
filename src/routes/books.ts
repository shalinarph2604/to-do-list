import express from 'express'
import bookController from '../controllers/book-controller'

// contoh mau bikin crud untuk endpoint /books

const routerBooks = express.Router()

routerBooks.get('/', bookController.getBook)

routerBooks.post('/', express.json(), bookController.addBook)

// routerBooks.get('/:id', (req, res) => {
//   const bookId = req.params.id
//   const book = books.find(({ id }) => id === bookId)

//   res.json({
//     message: 'success',
//     data: book,
//   })
// })

// routerBooks.delete('/:id', (req, res) => {
//   const bookId = req.params.id
//   books = books.filter(({ id }) => id !== bookId)

//   res.json({
//     message: 'success',
//     data: null,
//   })
// })

export default routerBooks
