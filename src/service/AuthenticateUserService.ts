import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import { AppDataSource } from '../database/data-source'
import authConfig from '../config/auth'

import AppError from '../errors/AppError'

import User from '../entities/User'

interface Request {
  email: string
  password: string
}

interface Response {
  user: User
  token: string
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = AppDataSource.getRepository(User)

    const user = await usersRepository.findOne({ where: { email } })

    if (!user) {
      throw new AppError('incorrect email/password combination.')
    }

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new AppError('incorrect email/password combination.')
    }

    const { secret, expiresIn } = authConfig.jwt
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    })

    return {
      user,
      token,
    }
  }
}

export default AuthenticateUserService
