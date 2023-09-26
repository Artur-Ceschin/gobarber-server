import { hash } from 'bcryptjs'
import { AppDataSource } from '../database/data-source'
import User from '../entities/User'

interface Request {
  name: string
  email: string
  password: string
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = AppDataSource.getRepository(User)

    const checkUserExists = await usersRepository.findOne({
      where: { email },
    })

    if (checkUserExists) {
      throw new Error('Email address already used.')
    }

    const hashedPassword = await hash(password, 8)

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    })

    await usersRepository.save(user)

    return user
  }
}

export default CreateUserService