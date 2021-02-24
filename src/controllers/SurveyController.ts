import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import SurveysRepository from "../repositories/SurveysRepository";
import CreateSurveyService from "../service/CreateSurveyService";

export default class SurveyController {
  static async create(req: Request, res: Response) {
    const { title, description } = req.body;
    const createSurveyService = new CreateSurveyService();
    const survey = await createSurveyService.execute({ title, description });

    return res.status(201).json(survey);
  }

  static async show(req: Request, res: Response) {
    const surveysRepository = getCustomRepository(SurveysRepository);
    const surveys = await surveysRepository.find();

    return res.status(200).json(surveys);
  }
}
