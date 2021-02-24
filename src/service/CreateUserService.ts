import { getRepository } from "typeorm";
import AppError from "../errors/AppError";
import User from "../models/User";

interface Request {
  name: string;
  email: string;
}

interface Response {
  id: string;
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
}

export default class CreateUserService {
  public async execute({ name, email }: Request): Promise<Response> {
    const usersRespository = getRepository(User);

    const isExistUser = await usersRespository.findOne({ where: { email } });

    if (isExistUser) {
      throw new AppError("User already exists!");
    }

    const user = usersRespository.create({
      name,
      email,
    });

    const userSaved = await usersRespository.save(user);

    return userSaved;
  }
}
