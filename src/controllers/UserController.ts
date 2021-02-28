import { Request, Response } from "express";
import CreateUserService from "../service/CreateUserService";
import * as yup from "yup";
import AppError from "../errors/AppError";

export default class UserController {
  static async create(req: Request, res: Response) {
    const { name, email } = req.body;

    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
    });

    if (!(await schema.isValid(req.body))) {
      throw new AppError("Body format is invalid!");
    }

    const createUserService = new CreateUserService();
    const user = await createUserService.execute({ name, email });
    return res.status(201).json(user);
  }
}
