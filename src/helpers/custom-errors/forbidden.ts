import CustomError from './custom-error'

class ForbiddenError extends CustomError {
  statusCode: number

  constructor(message: string, statusCode = 403) {
    super(message, statusCode)
    this.message = message
    this.statusCode = statusCode
  }
}

export default ForbiddenError
