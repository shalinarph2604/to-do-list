import CustomError from './custom-error'

class Unauthorized extends CustomError {
  statusCode: number

  constructor(message: string, statusCode = 401) {
    super(message, statusCode)
    this.message = message
    this.statusCode = statusCode
  }
}

export default Unauthorized
