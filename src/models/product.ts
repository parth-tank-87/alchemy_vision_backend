import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  DeleteDateColumn, 
  UpdateDateColumn 
} from "typeorm";

@Entity()
export class Products {
    @PrimaryGeneratedColumn()
    productid!: number;

    @Column({ nullable: true })
    productname?: string;

    @Column({ nullable: true })
    quantity?: number;

    @Column({ nullable: true, type: "float" })
    price?: number;

    @UpdateDateColumn()
    updated!: Date;

    // Add this column to your entity!
    @DeleteDateColumn()
    deletedAt?: Date;
}