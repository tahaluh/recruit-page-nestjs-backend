import { Company } from 'src/companys/company.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  username: string;

  @Column({ length: 255, unique: true})
  email: string;

  @Column({ length: 100 })
  password: string;
  
  @OneToOne(() => Company, (company) => company.user )
  company: Company;
}