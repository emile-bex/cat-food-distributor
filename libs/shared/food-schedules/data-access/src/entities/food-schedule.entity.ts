import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class FoodSchedule {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  distributorId: string

  @Column()
  cron: string

  @Column({default: true})
  isActive: boolean
}
