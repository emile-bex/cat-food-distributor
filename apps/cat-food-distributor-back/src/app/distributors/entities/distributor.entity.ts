import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm"

@Entity()
export class Distributor {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({unique: true})
  socketId: string

  @Column({unique: true})
  distributorId: string

  @Column({ default: false })
  isAuthorized: boolean;
}
