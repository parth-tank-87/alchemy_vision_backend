import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
@Entity()
export class Features {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: 'text'})
    name!: string;

    @Column({type: 'text'})
    description!: string;

    @Column({type: 'text'})
    created_by!: string;

    @Column({type: 'text'})
    updated_by!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}