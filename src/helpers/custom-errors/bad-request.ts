import CustomError from './custom-error'

class BadRequestError extends CustomError {
  statusCode: number

  constructor(message: string, statusCode = 400) {
    super(message, statusCode)
    this.message = message
    this.statusCode = statusCode
  }
}

export default BadRequestError
