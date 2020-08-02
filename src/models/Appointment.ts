import { 
  Entity,
  Column,
  PrimaryGeneratedColumn, 
  UpdateDateColumn, 
  CreateDateColumn 
} from 'typeorm';

@Entity('appointments') 
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider: string;

  @Column('time with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  update_at: Date;
}

export default Appointment; 