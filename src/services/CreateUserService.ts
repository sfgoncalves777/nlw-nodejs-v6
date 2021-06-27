import { getCustomRepository } from 'typeorm'
import { hash } from 'bcryptjs'
import { UsersRepositories } from '../repositories/UsersRepositories'

interface IUserRequest {
  name: string
  email: string
  admin?: boolean
  password: string
}

class CreateUserService {
  async execute({ name, email, admin = false, password }: IUserRequest) {
    if (!email) throw new Error('Email incorrect')
    const userRepository = getCustomRepository(UsersRepositories)
    const userAlreadyExists = await userRepository.findOne({ email })
    if (userAlreadyExists) throw new Error('User already exists')
    const passwordHash = await hash(password, 8)
    const user = userRepository.create({ name, email, password: passwordHash, admin })
    await userRepository.save(user)
    delete user.password
    return user
  }
}

export { CreateUserService }