import { getCustomRepository } from "typeorm";
import AppError from "../errors/AppError";
import SurveysRepository from "../repositories/SurveysRepository";

interface Request {
  title: string;
  description: string;
}

interface Response {
  id: string;
  title: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}

export default class CreateSurveyService {
  async execute({ title, description }: Request): Promise<Response> {
    const surveysRespository = getCustomRepository(SurveysRepository);

    const survey = surveysRespository.create({ title, description });

    const surveyFromDatabase = await surveysRespository.save(survey);

    if (!surveyFromDatabase) {
      throw new AppError("Cannot save that survey");
    }

    return surveyFromDatabase;
  }
}
