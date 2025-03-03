import CustomError from './custom-error'

class NotFoundError extends CustomError {
  statusCode: number

  constructor(message, statusCode = 404) {
    super(message, statusCode)
    this.message = message
    this.statusCode = statusCode
  }
}

export default NotFoundError
