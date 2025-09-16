import { Period } from 'src/pages/dashboard/scripts/models'
import { Vehicle } from 'src/scripts/libraries/refuel/models'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn
} from 'typeorm'

@Entity('dashboards')
export class Dashboard {
  @PrimaryGeneratedColumn()
  id!: number
  @Column()
  vehicleId!: number
  @OneToOne(() => Vehicle)
  @JoinColumn()
  vehicle?: Vehicle
  @Column()
  sequence!: number
  @Column({ default: true })
  visible!: boolean
}

@Entity('dashboardValueSettings')
export class DashboardValueSettings {
  @PrimaryGeneratedColumn()
  id?: number
  @Column()
  uid!: string
  @Column()
  sequence!: number
  @Column()
  periodId?: number
  @Column()
  period?: Period
  @Column({ default: true })
  visible!: boolean
  @Column({ default: '' })
  title?: string
}
