import { AdvertisingEntity } from "../entities/advertising-entity";
import { CategoriesEntity } from "../entities/categories-entity";
export class AdvertisingService {
    public async insert(data: AdvertisingEntity) {
        const ad = AdvertisingEntity.create(data);
        await ad.save()
        return ad;
    }
    public async find(id: number) {
        const ad = await AdvertisingEntity.findOne(id);
        return ad;
    }
    public async findAll(page: number, count: number) {
        const ad = await AdvertisingEntity.find({
            skip: page * count,
            take: count,
            order: { id: 'ASC' }
        })
        return ad;
    }
    public async delete(id: number) {
        const ad = await AdvertisingEntity.delete(id)
        return ad;
    }
    public async addCategory(ad: AdvertisingEntity, category: CategoriesEntity) {
        console.log(ad.cat);
        if (ad.cat != undefined) {
            console.log("if 1", ad.cat);
            ad.cat.push(category);
        } else {
            ad.cat = [category];
        }

        await ad.save();

        return ad;
    }
}
