import path from 'path'
import fs from 'fs'

import { AppDataSource } from '../database/data-source'

import uploadConfig from '../config/upload'

import AppError from '../errors/AppError'

import User from '../entities/User'

interface Request {
  user_id: string
  avatarFilename: string
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const usersRepository = AppDataSource.getRepository(User)

    const user = await usersRepository.findOne({ where: { id: user_id } })

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.')
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)
      const userAvatarFilesExists = await fs.promises.stat(userAvatarFilePath)

      if (userAvatarFilesExists) {
        await fs.promises.unlink(userAvatarFilePath)
      }
    }

    user.avatar = avatarFilename
    await usersRepository.save(user)

    return user
  }
}

export default UpdateUserAvatarService
