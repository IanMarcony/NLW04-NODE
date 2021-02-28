import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import AppError from "../errors/AppError";
import SurveyUsersRepository from "../repositories/SurveyUsersRepository";


export default class AnswerController{
  static async execute(req: Request, res: Response) {
    const {value} = req.params
    const {  u  } = req.query

    const surveyUserRepository =  getCustomRepository( SurveyUsersRepository);

    const surveyUser = await surveyUserRepository.findOne({where:{id:String(u)}})

    if(!surveyUser){
      throw new AppError("Survey User does not exist!",404)
    }

    surveyUser.value = Number(value)

    await surveyUserRepository.save(surveyUser)

    res.json(surveyUser)


  }
}
