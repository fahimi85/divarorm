import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { CategoriesEntity } from "./categories-entity";
@Entity('Advertising')
export class AdvertisingEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => CategoriesEntity)
    @JoinTable({
        name: "AdvertisingCategories",
        joinColumn: {
            name: "AdvertisingId",
            referencedColumnName: "id",
        },
        inverseJoinColumn: {
            name: "CategoriesId",
            referencedColumnName: "id",
        },
    })
    cat: CategoriesEntity[];
}