import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { AdvertisingEntity } from "./advertising-entity";
@Entity('Categories')
export class CategoriesEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => AdvertisingEntity)
    @JoinTable({
        name: "AdvertisingCategories",
        joinColumn: {
            name: "CategoriesId",
            referencedColumnName: "id",
        },
        inverseJoinColumn: {
            name: "AdvertisingId",
            referencedColumnName: "id",
        },
    })
    ad: AdvertisingEntity[];
}