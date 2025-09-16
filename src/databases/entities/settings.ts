import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('settings')
export class Settings {
  @PrimaryGeneratedColumn()
  id?: number
  @Column()
  colorThemeId!: number
  @Column()
  distanceUnitId!: number
  @Column()
  vehicleId: number | null = null
  @Column({ default: false })
  plateNumberInTitleActive!: boolean
  @Column({ default: false })
  autoBackupActive!: boolean
  @Column()
  autoBackupPath!: string
  @Column()
  lastUpdateCheck!: Date
  @Column({ default: 1 })
  languageId!: number
}
