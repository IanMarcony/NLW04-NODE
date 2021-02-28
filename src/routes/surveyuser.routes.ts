import { Router } from "express";
import SendEmailController from "../controllers/SendEmailController";

const surveyuserRoutes = Router();

surveyuserRoutes.post("/", SendEmailController.execute);


export default surveyuserRoutes;
