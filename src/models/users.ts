import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class Users {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    first_name!: string;

    @Column()
    last_name!: string;

    @Column()
    email!: string;

    @Column({type: "bigint"})
    mobile_number!: number;

    @Column({default: false})
    status!: boolean;

    @Column({default: null})
    plan_id!: number;

    @Column({default: null})
    password!: string;

    @Column()
    stripe_customer_id!: string;

    @Column({default: 0})
    role!: number;

    @Column({default: false})
    plan?: boolean;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}