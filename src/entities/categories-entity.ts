import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";
import { AdvertisingEntity } from "./advertising-entity";
@Entity('Categories')
export class CategoriesEntity extends BaseEntity {
    @PrimaryColumn()
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