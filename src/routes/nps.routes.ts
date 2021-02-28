import { Router } from "express";
import NpsController from "../controllers/NpsController";

const npsRoutes = Router();

npsRoutes.get("/:survey_id", NpsController.execute);

export default npsRoutes;
