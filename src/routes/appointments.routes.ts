import { Router } from 'express'

import { parseISO } from 'date-fns'

import CreateAppointmentService from '../service/CreateAppointmentService'
import AppointmentsRepository from '../repositories/AppointmentsRepository'

const appointmentsRouter = Router()

appointmentsRouter.get('/', async (request, response) => {
  const appointments = await AppointmentsRepository.find()
  return response.json(appointments)
})

appointmentsRouter.post('/', async (request, response) => {
  try {
    const { provider_id, date } = request.body

    const parsedDate = parseISO(date)

    const createAppointment = new CreateAppointmentService()

    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider_id,
    })

    return response.json(appointment)
  } catch (error) {
    return response.status(400).json({ error: error.message })
  }
})

export default appointmentsRouter
