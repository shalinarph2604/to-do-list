import books, { Book } from '../models/book'

const addBook = (book: Book) => {
  return books.push(book)
}

const getBookById = (id: string) => {
  return books.find(book => book.id === id)
}

const getAllBook = () => {
  return books
}

const removeBookById = (id: string) => {
  const filteredBooks = books.filter(book => book.id !== id)
  books.splice(0, books.length)
  filteredBooks.forEach((book) => {
    books.push(book)
  })
}

export default {
  addBook,
  getBookById,
  getAllBook,
  removeBookById,
}
