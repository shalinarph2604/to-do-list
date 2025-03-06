import bookRepo from '../repositories/book-repository'
import { Book } from '../models/book'
import NotFoundError from '../helpers/custom-errors/not-found'

const addBook = (book: Book) => {
  bookRepo.addBook(book)
  return bookRepo.getBookById(book.id)
}

const getBookById = (id: string) => {
  return bookRepo.getBookById(id)
}

const getAllBook = () => {
  return bookRepo.getAllBook()
}

const removeBookById = (id: string) => {
  const book = bookRepo.getBookById(id)
  if (!book) {
    throw new NotFoundError('Book Not Found')
  }
  return bookRepo.removeBookById(id)
}

export default {
  addBook,
  getBookById,
  getAllBook,
  removeBookById,
}
