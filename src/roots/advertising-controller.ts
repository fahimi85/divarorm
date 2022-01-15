import express, { Request, Response } from "express";
import got from "got";
import { CategoriesEntity } from '../entities/categories-entity'
import { AdvertisingEntity } from '../entities/advertising-entity'
import { AdvertisingService } from "../services/advertising-service";
import { CategoriesService } from "../services/categories-service";
const app = express();
const router = express.Router();
app.use(express.json());