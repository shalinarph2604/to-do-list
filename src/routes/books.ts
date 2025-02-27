import express from 'express'

// contoh mau bikin crud untuk endpoint /books
interface Book {
  id: string
  title: string
}

let books: Book[] = []

const routerBooks = express.Router()

routerBooks.get('/', (req, res) => {
  res.json({
    message: 'success',
    data: books,
  })
})

routerBooks.post('/', (req, res) => {
  const book = req.body
  book.id = crypto.randomUUID()
  books.push(book)
  res.status(201).json({
    message: 'success',
    data: book,
  })
})

routerBooks.get('/:id', (req, res) => {
  const bookId = req.params.id
  const book = books.find(({ id }) => id === bookId)

  res.json({
    message: 'success',
    data: book,
  })
})

routerBooks.delete('/:id', (req, res) => {
  const bookId = req.params.id
  books = books.filter(({ id }) => id !== bookId)

  res.json({
    message: 'success',
    data: null,
  })
})

export default routerBooks
