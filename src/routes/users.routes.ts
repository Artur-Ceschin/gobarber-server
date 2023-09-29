import { Router } from 'express'
import multer from 'multer'

import CreateUserService from '../service/CreateUserService'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import uploadConfig from '../config/upload'
import UpdateUserAvatarService from '../service/UpdateUserAvatarService'

const usersRouter = Router()
const upload = multer(uploadConfig)

usersRouter.post('/', async (request, response) => {
  try {
    const { email, name, password } = request.body

    const createUser = new CreateUserService()

    const user = await createUser.execute({ email, name, password })

    delete user.password

    return response.json(user)
  } catch (error) {
    return response.status(400).json({ error: error.message })
  }
})

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    try {
      const updateUserAvatar = new UpdateUserAvatarService()

      const user = await updateUserAvatar.execute({
        user_id: request.user.id,
        avatarFilename: request.file.filename,
      })

      delete user.password

      return response.json(user)
    } catch (error) {}
  },
)

export default usersRouter
