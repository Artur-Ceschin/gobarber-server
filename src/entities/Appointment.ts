import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('appointments')
class Appointment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column() // Por default será varchar
  provider: string

  @Column('timestamp with time zone')
  date: Date
}

export default Appointment
