import config from '../../../config'
import { IUser } from './users.interface'
import { User } from './users.model'
import { generateUserId } from './users.utils'

const createUser = async (user: IUser): Promise<IUser | null> => {
  // auto generated id
  const id = await generateUserId()
  user.id = id

  // Default generated password
  if (!user.password) {
    user.password = config.student_user_password as string
  }

  const createdUser = await User.create(user)

  if (!createdUser) {
    throw new Error('Failed to create user!')
  }

  return createdUser
}

export default {
  createUser,
}
