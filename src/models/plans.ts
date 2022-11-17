import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Plans {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: 'text'})
    name!: string;

    @Column({type: 'text'})
    description!: string;

    @Column({type: 'int'})
    number_of_license!: number;

    @Column({type: 'int'})
    monthly_price!: number;

    @Column({type: 'int'})
    annual_price!: number;

    @Column({type: 'text', default: 'usd'})
    currency!: string;

    @Column({type: 'text'})
    created_by!: string;

    @Column({type: 'text'})
    updated_by!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}