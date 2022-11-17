import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Subscriptions {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: 'text'})
    plan_id!: string;

    @Column({type: 'text'})
    stripe_customer_id!: string;

    @Column({type: 'text'})
    user_id!: string;

    @Column({type: 'text'})
    plan_interval!: string;

    @Column({type: 'text'})
    plan_date!: string;

    @Column({type: 'text'})
    status!: string;

    @Column({type: 'text'})
    created_by!: string;
    
    @Column({type: 'text'})
    updated_by!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
};