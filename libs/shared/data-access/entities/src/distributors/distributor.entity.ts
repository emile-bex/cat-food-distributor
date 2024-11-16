import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Distributor {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({unique: true, nullable: true})
  socketId: string

  @Column({unique: true})
  distributorId: string

  @Column({ default: false })
  isAuthorized: boolean;

  @Column({ default: true })
  isConnected: boolean;
}
