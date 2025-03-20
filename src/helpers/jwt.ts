import jwt from 'jsonwebtoken'

const generateToken = async (payload, expiresIn): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, 'secret_key', {
      expiresIn,
    }, function (err, token) {
      if (err) {
        reject(err)
      }
      if (token) {
        resolve(token)
      }
    })
  })
}

const verifyToken = async (token: string): Promise<string | jwt.JwtPayload> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, 'secret_key', function (error, decoded) {
      if (error) {
        reject(error)
      }
      if (decoded) {
        resolve(decoded)
      }
    })
  })
}

export default {
  generateToken,
  verifyToken,
}
