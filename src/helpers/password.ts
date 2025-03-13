import argon2 from 'argon2'

if (!process.env.PASSWORD_SECRET) {
  throw new Error('PASSWORD_SALT is not set in env')
}

const secret = Buffer.from(process.env.PASSWORD_SECRET)

const hashPassword = async (password: string): Promise<string> => {
  return argon2.hash(password, { secret })
}

const verifyPassword = async (password: string, hash: string) => {
  return argon2.verify(hash, password, { secret })
}

export default {
  hashPassword,
  verifyPassword,
}
