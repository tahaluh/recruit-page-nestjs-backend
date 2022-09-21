import { Job } from 'src/jobs/job.entity';
import { User } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany, JoinColumn } from 'typeorm';

@Entity()
export class Company {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255})
    name: string;

    @Column({ length: 255})
    cellphone: string;

    @Column({ length: 255})
    website: string;

    @Column({ length: 255})
    address: string;

    @OneToOne(() => User, (user) => user.company )
    @JoinColumn()
    user: User;  
}
