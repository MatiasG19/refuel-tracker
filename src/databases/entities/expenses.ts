import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Vehicle } from './vehicles'

export class BaseExpense {
  @PrimaryGeneratedColumn()
  id!: number
  @Column()
  date!: Date
  @Column()
  payedAmount!: number
  @Column()
  vehicleId!: number
}

@Entity('refuels')
export class Refuel extends BaseExpense {
  @ManyToOne(() => Vehicle, vehicle => vehicle.refuels)
  vehicle?: Vehicle
  @Column()
  refueledAmount!: number
  @Column()
  distanceDriven!: number
}

@Entity('expenses')
export class Expense extends BaseExpense {
  @ManyToOne(() => Vehicle, vehicle => vehicle.expenses)
  vehicle?: Vehicle
  @Column()
  description!: string
}
