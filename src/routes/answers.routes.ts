import { Router } from "express";
import AnswerController from "../controllers/AnswerController";


const answerRoutes = Router();


answerRoutes.get("/:value", AnswerController.execute);

export default answerRoutes;
