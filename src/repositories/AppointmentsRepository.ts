import { AppDataSource } from '../database/data-source'
import Appointment from '../entities/Appointment'

const AppointmentsRepository = AppDataSource.getRepository(Appointment).extend({
  async findByDate(date: Date) {
    const findAppointment = await this.findOne({
      where: { date },
    })

    return findAppointment ?? null
  },
})

export default AppointmentsRepository
