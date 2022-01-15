import { AdvertisingEntity } from "../entities/advertising-entity";
import { CategoriesEntity } from "../entities/categories-entity";
export class CategoriesService {
    public async insert(data: CategoriesEntity) {
        const cat = CategoriesEntity.create(data);
        await cat.save()
        return cat;
    }
    public async find(id: number) {
        const cat = await CategoriesEntity.findOne(id);
        return cat;
    }
    public async findAll(page: number, count: number) {
        const cat = await CategoriesEntity.find({
            skip: page * count,
            take: count,
            order: { id: 'ASC' }
        })
        return cat;
    }
    public async delete(id: number) {
        const cat = await CategoriesEntity.delete(id)
        return cat;
    }
    public async addCategory(ad: AdvertisingEntity, category: CategoriesEntity) {
        console.log(category.ad);
        if (category.ad != undefined) {
            console.log("if 1", category.ad);
            category.ad.push(ad);
        } else {
            category.ad = [ad];
        }
        await category.save();
        return category;
    }
}
