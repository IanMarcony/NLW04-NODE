import { Router } from "express";
import CreateUserService from "../service/CreateUserService";

const userRoutes = Router();

userRoutes.post("/", async (req, res) => {
  const { name, email } = req.body;
  const createUserService = new CreateUserService();
  const user = await createUserService.execute({ name, email });
  return res.status(201).json(user);
});

export default userRoutes;
