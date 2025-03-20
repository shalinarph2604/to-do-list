import { User } from './models/User'

declare global {
  namespace Express {
    interface Request {
      USER?: Omit<User, 'password'> // Make it optional if `USER` might not always be present
    }
  }
}
