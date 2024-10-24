import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class FoodServing {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  distributorId: string

  @Column()
  dateTime: Date;

  @Column({ default: false })
  isConfirmed: boolean;
}
