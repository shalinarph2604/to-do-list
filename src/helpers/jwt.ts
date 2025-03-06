import jwt from 'jsonwebtoken'

const generateToken = async (payload, expiresIn) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, 'secret_key', {
      expiresIn,
    }, function (err, token) {
      if (err) {
        reject(err)
      }
      resolve(token)
    })
  })
}

const verifyToken = (token: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, 'secret_key', function (error, decoded) {
      if (error) {
        reject(error)
      }
      resolve(decoded)
    })
  })
}

export default {
  generateToken,
  verifyToken,
}
