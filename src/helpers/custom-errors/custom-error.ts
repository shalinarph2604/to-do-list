class CustomError extends Error {
  statusCode = 500

  constructor(message: string, statusCode: number | undefined) {
    super(message)
    this.statusCode = statusCode || this.statusCode
  }
}

export default CustomError
