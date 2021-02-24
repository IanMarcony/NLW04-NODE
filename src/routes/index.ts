import { Router } from "express";
import userRoutes from "./users.routes";
import surveyRoutes from "./surveys.routes";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/surveys", surveyRoutes);

export default routes;
