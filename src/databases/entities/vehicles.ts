import { FuelUnit } from 'src/scripts/libraries/refuel/models'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Expense, Refuel } from './expenses'

@Entity('vehicles')
export class Vehicle {
  @PrimaryGeneratedColumn()
  id!: number
  @Column()
  name!: string
  @Column()
  plateNumber!: string
  @Column()
  currencyUnit!: string
  @Column()
  fuelUnitId!: number
  @Column()
  fuelUnit?: FuelUnit
  @OneToMany(() => Refuel, refuel => refuel.vehicle)
  refuels?: Refuel[]
  @OneToMany(() => Expense, expense => expense.vehicle)
  expenses?: Expense[]
  @Column()
  totalFuelConsumption?: string
  @Column()
  odometer!: number
}
