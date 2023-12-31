import { startOfHour } from 'date-fns'

import Appointment from '../entities/Appointment'
import AppointmentsRepository from '../repositories/AppointmentsRepository'
import AppError from '../errors/AppError'

interface Request {
  provider_id: string
  date: Date
}

class CreateAppointmentService {
  public async execute({ date, provider_id }: Request): Promise<Appointment> {
    const appointmentsRepository = AppointmentsRepository

    const appointmentDate = startOfHour(date)

    const findAppointmentInSameDate =
      await appointmentsRepository.findByDate(appointmentDate)

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked')
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    })

    await appointmentsRepository.save(appointment)

    return appointment
  }
}

export default CreateAppointmentService
