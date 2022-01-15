import express, { NextFunction, Request, Response } from "express";
import { createConnection } from 'typeorm'
import { CategoriesEntity } from './entities/categories-entity'
import { AdvertisingEntity } from './entities/advertising-entity'
import { CategoriesController } from './roots/categories-controller'
const app = express()

async function main() {
    try {
        await createConnection({
            type: "mssql",
            host: "localhost",
            port: 1434,
            username: "user1",
            password: "123",
            extra: {
                trustServerCertificate: true,
            },
            database: "typeorm",
            synchronize: true,
            entities: [CategoriesEntity, AdvertisingEntity],
            // logging: true,
        });
        console.log("database connected");
        app.use(express.json())
        app.use("/api/cat/", CategoriesController);

        app.listen(3000, () => console.log('listening on port 3000'))
    }
    catch (e: any) {
        console.error(e);
        console.log("connection error");
    }
}
main()