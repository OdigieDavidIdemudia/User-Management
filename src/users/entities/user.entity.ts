import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";


@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'fullname'})
    fullName: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column({name: 'is_approved',default: false})
    isApproved: boolean;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}