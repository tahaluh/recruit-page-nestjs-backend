import { Company } from 'src/companys/company.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Job {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255})
    description: string;

    @Column({ length: 45})
    office: string;

    @Column({ length: 255})
    skills: string;

    @Column()
    salary: number;

    @Column()
    end_date: Date;

    @ManyToOne(type => Company, {eager: true})
    @JoinColumn()
    company: Company;
}
