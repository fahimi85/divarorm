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


router.get("/", async (req: Request, res: Response) => {
    try {
        // const response = await got(`https://api.divar.ir/v8/web-search/mashhad/car`);
        // const json = JSON.parse(response.body);
        var categorylist = ["buy-old-house", "buy-villa", "buy-apartment", "buy-residential", "auto", "car", "classic-car", "rental-car", "heavy-car", "electronic-devices", "home-kitchen", "services", "personal-goods", "entertainment", "social-services", "tools-materials-equipment", "jobs"]
        for (var i = 0; i < categorylist.length; i++) {
            let name: string = categorylist[i]
            var cat = new CategoriesEntity();
            cat.name = name;
            await categoryservice.insert(cat);
        }

        // categorylist.forEach(async item => {
        //     var cat = new CategoriesEntity();
        //     cat.name = item;
        //     await categoryservice.insert(cat);
        // })
        // const response = await got(`https://api.divar.ir/v8/web-search/mashhad/`);
        // const json = JSON.parse(response.body);
        // var main3 = json.schema.ui_schema.category.urischema
        // var main4 = Object.keys(main3)
        // console.log(main4)
        // console.log(json.schema.ui_schema.category.urischema.order)

        // var main = json.schema.ui_schema.category.urischema.display;

        // var main2 = Object.keys(main);
        // for (let i = 0; i < main2.length; i++) {
        //     main2[i] = `${i + 1}-${main2[i]}   `
        // }

        // console.log(main2)
        let main3 = `
        <label for="Category">Please Choose Your Category and enter in the url:</label>
        <select name="Category" id="Category">`
        for (let i = 0; i < categorylist.length; i++) {
            main3 = main3 + `<option value="${categorylist[i]}">${categorylist[i]}</option>`
        }
        main3 = main3 + `</select>`

        res.send(main3);

        // res.send("<b>Please Choose Your Category and enter in the url</b><br>" + main2);
        // res.send(`<div id="demo">
        // <h2>The XMLHttpRequest Object</h2>
        // <button type="button" onclick="loadDoc()">Change Content</button>
        // </div>

        // <script>
        // function loadDoc() {
        //   const xhttp = new XMLHttpRequest();
        //   xhttp.onload = function() {
        //     document.getElementById("demo").innerHTML =
        //     this.responseText;
        //   }
        //   xhttp.open("GET", "ajax_info.txt");
        //   xhttp.send();
        // }
        // </script>`);

    } catch (error) {
        console.log(error);
    }
});
router.get("/:name", async (req: Request, res: Response) => {
    try {
        var categor = req.params.name
        // const response = await got(`https://api.divar.ir/v8/web-search/mashhad/car`);
        // const json = JSON.parse(response.body);
        const response = await got(`https://api.divar.ir/v8/web-search/mashhad/${categor}`);
        // if (!response) {
        //     res.status(404).send('no such category');
        // } else {
        //     const json = JSON.parse(response.body);
        //     var main = json.schema.json_schema.properties;
        //     if (main.brand_model) {
        //         const main2 = main.brand_model.properties.value.items.enum;
        //         res.send("<b>Please Choose Your Specific Brand and eneter in the url</b><br>" + main2);
        //     } else {
        //         res.send("<b>Your Chooosen Category Does Not Have Specific models, for a Beautified api, please enter your category in format like this to start getting your ads</b><br>"
        //             + `/api/un/${req.params.name}`);
        //     }
        // };
        // const json = JSON.parse(response.body);
    } catch (error) {
        console.log(error);
    }
});
export { router as CategoriesController };
