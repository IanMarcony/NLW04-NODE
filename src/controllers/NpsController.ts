import { Request, Response } from "express";
import { getCustomRepository, Not, IsNull } from "typeorm";
import SurveyUsersRepository from "../repositories/SurveyUsersRepository";

export default class NpsController {
  static async execute(req: Request, res: Response) {
    const { survey_id } = req.params;

    const surveyUsersRepository = getCustomRepository(SurveyUsersRepository);

    const surveysUsers = await surveyUsersRepository.find({
      where: { survey_id, value: Not(IsNull()) },
    });

    const dectartors = surveysUsers.filter(
      survey => survey.value >= 0 && survey.value <= 6,
    ).length;

    const promotors = surveysUsers.filter(
      survey => survey.value >= 9 && survey.value <= 10,
    ).length;

    const totalAnswers = surveysUsers.length;

    const npsSurvey = ((promotors - dectartors) / totalAnswers) * 100;

    return res.json({
      dectartors,
      promotors,
      totalAnswers,
      npsSurvey: Number(npsSurvey.toFixed(2)),
      survey_id,
    });
  }
}
