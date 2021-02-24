import { Request, Response } from "express";
import CreateUserService from "../service/CreateUserService";

export default class UserController {
  static async create(req: Request, res: Response) {
    const { name, email } = req.body;
    const createUserService = new CreateUserService();
    const user = await createUserService.execute({ name, email });
    return res.status(201).json(user);
  }
}
