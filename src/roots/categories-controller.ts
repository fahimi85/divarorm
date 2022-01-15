import express, { Request, Response } from "express";
import got from "got";
import { CategoriesEntity } from '../entities/categories-entity'
import { AdvertisingEntity } from '../entities/advertising-entity'
import { AdvertisingService } from "../services/advertising-service";
import { CategoriesService } from "../services/categories-service";
const app = express();
const router = express.Router();
app.use(express.json());
const adservice = new AdvertisingService();
const categoryservice = new CategoriesService();
var car: string = ""
var categorylist = ["buy-old-house", "buy-villa", "buy-apartment", "buy-residential", "auto", "classic-car", "rental-car", "heavy-car", "electronic-devices", "home-kitchen", "services", "personal-goods", "entertainment", "social-services", "tools-materials-equipment", "jobs"]

setInterval(() => {

    router.get("/", async (req: Request, res: Response) => {
        // deleteLastTable

        var id: number
        for (id = 1; id < categorylist.length + 1; id++) {
            await CategoriesEntity.delete(id)

        }

        for (var i = 0; i < categorylist.length; i++) {
            let name: string = categorylist[i]
            var cat = new CategoriesEntity();
            cat.id = i + 1
            cat.name = name;
            await categoryservice.insert(cat);
        }

        var response2 = await got(`https://api.divar.ir/v8/web-search/mashhad/${categorylist[0]}`);
        var json = JSON.parse(response2.body);
        var carlist: { title: string, price: string, kilometer: string, image: ImageData }[] = []
        json.widget_list.forEach((item: { data: { description: string; title: string; image: ImageData; }; }) => {

            var descript = item.data.description
            var splitpriceANDkilometer: string[] = descript.split(`\n`)
            var kilometer: string = splitpriceANDkilometer[1];
            var price: string = splitpriceANDkilometer[0]
            var carobject = {
                title: item.data.title,
                price: (price == undefined) ? "" : price,
                kilometer: (kilometer == undefined) ? "" : kilometer,
                image: item.data.image
            }

            carlist.push(carobject)
        });
        for (i = 0; i < carlist.length; i++) {
            var advertis = new AdvertisingEntity();
            advertis.title = carlist[i].title;
            advertis.price = carlist[i].price;
            advertis.kilometer = carlist[i].kilometer;
            // Advertis.image = carobject.image;

            await adservice.insert(advertis);

        }
        let main3 = `
        <label for="Category">Please Choose Your Category and enter in the url:</label>
        <select name="Category" id="Category" onchange="document.location.href = '/api/' + this.value">`
        for (let i = 0; i < categorylist.length; i++) {
            main3 = main3 + `<option value="${categorylist[i]}">${categorylist[i]}</option>`
        }
        main3 = main3 + `</select>`
        let Criticalvalue = `<lable>  Critical value</lable><input></input><br><br>`


        car = `<h1> ${categorylist[0]} Shop</h1>`
        car += "<h2>you can campare and then choosh the best</h2>"
        car += main3 + Criticalvalue
        carlist.forEach(item => {
            car += `<div style="border: 1px solid #FB4805;background-color: #FF5733; margin-bottom: 4px;border-width:3px ;border-radius: 20px;color:white;width:60%;font-size:20px;direction: rtl;display: flex;flex-wrap: wrap;flex-direction: row;justify-content:center;"><div>${item.title}</div><div>${item.price}</div><div>${item.kilometer}</div><div><img src= ${item.image}></div></div>`
        })
        car += `</div>`
        res.send(car);


    })
    router.get("/:name", async (req: Request, res: Response) => {
        // deleteLastTable

        var id: number
        for (id = 1; id < categorylist.length + 1; id++) {
            await CategoriesEntity.delete(id)

        }

        for (var i = 0; i < categorylist.length; i++) {
            let name: string = categorylist[i]
            var cat = new CategoriesEntity();
            cat.id = i + 1
            cat.name = name;
            await categoryservice.insert(cat);
        }

        var categor = req.params.name
        var response2 = await got(`https://api.divar.ir/v8/web-search/mashhad/${categor}`);
        var json = JSON.parse(response2.body);
        var carlist: { title: string, price: string, kilometer: string, image: ImageData }[] = []
        json.widget_list.forEach((item: { data: { description: string; title: string; image: ImageData; }; }) => {

            var descript = item.data.description
            var splitpriceANDkilometer: string[] = descript.split(`\n`)
            var kilometer: string = splitpriceANDkilometer[1];
            var price: string = splitpriceANDkilometer[0]
            var carobject = {
                title: item.data.title,
                price: (price == undefined) ? "" : price,
                kilometer: (kilometer == undefined) ? "" : kilometer,
                image: item.data.image
            }
            carlist.push(carobject)

        });
        for (i = 0; i < carlist.length; i++) {
            var advertis = new AdvertisingEntity();
            advertis.title = carlist[i].title;
            advertis.price = carlist[i].price;
            advertis.kilometer = carlist[i].kilometer;
            // Advertis.image = carobject.image;

            await adservice.insert(advertis);

        }
        let main3 = `
        <label for="Category">Please Choose Your Category and enter in the url:</label>
        <select name="Category" id="Category" onchange="document.location.href = '/api/' + this.value">`
        for (let i = 0; i < categorylist.length; i++) {
            main3 = main3 + `<option value="${categorylist[i]}">${categorylist[i]}</option>`
        }
        main3 = main3 + `</select>`
        let Criticalvalue = `<lable>   Critical value</lable><input></input><br><br>`


        car = `<h1> ${categor} Shop</h1>`
        car += "<h2>you can campare and then choosh the best</h2>"
        car += main3 + Criticalvalue
        carlist.forEach(item => {
            car += `<div style="border: 1px solid #FB4805;background-color: #FF5733; margin-bottom: 4px;border-width:3px ;border-radius: 20px;color:white;width:60%;font-size:20px;direction: rtl;display: flex;flex-wrap: wrap;flex-direction: row;justify-content:center;"><div>${item.title}</div><div>${item.price}</div><div>${item.kilometer}</div><div><img src= ${item.image}></div></div>`
        })
        car += `</div>`
        res.send(car);


    })

}, 1000);
export { router as CategoriesController };
