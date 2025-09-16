import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('refuelFilters')
export class RefuelFilter {
  @PrimaryGeneratedColumn()
  id?: number
  @Column()
  name!: string
  @Column()
  title!: string
  @Column({ default: true })
  active!: boolean
  @Column()
  dateFrom!: Date
  @Column()
  dateUntil!: Date
  @Column({ default: 1 })
  type!: number
}
