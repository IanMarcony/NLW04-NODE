import { Router } from "express";
import userRoutes from "./users.routes";
import surveyRoutes from "./surveys.routes";
import surveyuserRoutes from "./surveyuser.routes";
import answerRoutes from "./answers.routes";
import npsRoutes from "./nps.routes";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/surveys", surveyRoutes);
routes.use("/sendEmail", surveyuserRoutes);
routes.use("/answers", answerRoutes);
routes.use("/nps", npsRoutes);

export default routes;
