class CustomError extends Error {
  statusCode = 500

  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode || this.statusCode
  }
}

export default CustomError
