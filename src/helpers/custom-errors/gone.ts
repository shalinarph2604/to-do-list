import CustomError from './custom-error'

class GoneError extends CustomError {
  statusCode: number

  constructor(message: string, statusCode = 410) {
    super(message, statusCode)
    this.message = message
    this.statusCode = statusCode
  }
}

export default GoneError
